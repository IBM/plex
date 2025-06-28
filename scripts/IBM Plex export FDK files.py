#FLM: IBM Plex export for FDK
# -*- coding: utf-8 -*-

'''
	* IBM Plex export for FDK *
	written for FontLab 5
	exports all files necessary for AFDKO to compile an OTF or TTF font
	requires RoboFab: https://github.com/robofab-developers/robofab

	version: 1.0
	author: Paul van der Laan
	last modification: 2018-02-07
'''

import os
try:
	from robofab.world import world
	hasRF = True
except ImportError:
	hasRF = False

if hasRF == True:
	from robofab.world import CurrentFont, OpenFont
	from robofab.interface.all.dialogs import ProgressBar, GetFolder
	FLmode = world.inFontLab
	if FLmode == True:
		from FL import *
		import fl_cmd



lineBreakChr = '\n'



def stringToUnicode(myString):
	'''decode a FontLab string assuming it is either utf-8 or macintosh roman'''
	unicodeString = ''
	try:
		unicodeString = myString.decode('utf-8')
	except UnicodeDecodeError:
		try:
			unicodeString = myString.decode('mac_roman')
		except UnicodeDecodeError:
			print '* ERROR - unable to decode string to unicode *'
			unicodeString = ''
	return unicodeString



def unicodeToMacRoman(myString):
	'''convert unicode string to macintosh roman encoding'''
	macRomanString = ''
	myString = myString.encode('mac_roman', 'replace')
	for c in myString:
		if ord(c) < 127:
			macRomanString += c
		else:
			c2 = '\\%02x' % ord(c)
			macRomanString += c2
	return str(macRomanString)



def unicodeToEscapedASCII(myString):
	'''convert unicode string to escaped characters for everything beyond ascii'''
	asciiString = ''
	for c in myString:
		if ord(c) < 127:
			asciiString += c
		else:
			c2 = '\\%04x' % ord(c)
			asciiString += c2
	return str(asciiString)



def setDirectory(myPath, dirName):
	'''check if a given directory exists, create if it doesn't, and return full path'''
	destPath = os.path.join(myPath, dirName)
	if not os.path.exists(destPath):
		os.makedirs(destPath)
	return destPath



def getFilePaths(dirPath, myExt):
	'''get list of files from a folder'''
	dirList = os.listdir(dirPath)
	allFilePaths = [os.path.join(dirPath, myFileName) for myFileName in dirList if os.path.splitext(myFileName)[1] == myExt ]
	return allFilePaths



def decomposeComp(f):
	'''decompose composites for all glyphs in the font'''
	myBar = ProgressBar('Decomposing...', len(f))
	for g in f:
		if g.components:
			for c in range(len(g.components)):
				g.components[-1].decompose()
			g.update()
		myBar.tick()
	myBar.close()
	f.update()



def createDSIG(f):
	'''create empty DSIG table in FontLab'''
	ttag = 'DSIG'
	l = [0, 0, 0, 1, 0, 0, 0, 0]   # table data
	tvalue = ''
	for x in l:
		tvalue += chr(x)
	ttTables = f.naked().truetypetables
	# delete existing table first
	for n in range(len(ttTables)):
		if ttTables[n].tag == ttag:
			del ttTables[n]
	ttTables.append(TrueTypeTable(ttag, tvalue, len(tvalue)))
	f.naked().truetypetables[len(ttTables) - 1].value = tvalue



def writeFontInfo(f, targetPath):
	'''write font info'''
	allLines = []
	winSubFamName = f.info.styleMapStyleName
	italicFlag = 'false'
	if 'italic' in winSubFamName:
		italicFlag = 'true'
	allLines.append('IsItalicStyle %s' % italicFlag)
	boldFlag = 'false'
	if 'bold' in winSubFamName:
		boldFlag = 'true'
	allLines.append('IsBoldStyle %s' % boldFlag)
	allLines.append('')   # extra linebreak

	myPath = os.path.join(targetPath, "fontinfo")
	myFile = open(myPath, "w")
	myFile.write(lineBreakChr.join(allLines))
	myFile.close()



def writeGlyphOrderAndAliasDB(f, targetPath, hasPS):
	'''write GlyphOrderAndAliasDB'''
	renameDict = {}
	libKey = 'com.type-invaders.name.final'
	renameDict = {}
	for g in f:
		if g.lib.has_key(libKey):
			renameDict[g.name] = g.lib[libKey]
	
	allLines = []
	glyphOrder = [f[n].name for n in range(len(f))]
	# file structure: [final_name][\t][production_name][\t][uniXXXX]
	for glyphNameProd in glyphOrder:
		myLine = []
		g = f[glyphNameProd]
		glyphNameFinal = renameDict.get(glyphNameProd)
		if glyphNameFinal == None:
			glyphNameFinal = glyphNameProd
		# rename /CR to /uni000D
		if glyphNameProd == 'CR' and hasPS != True:
			glyphNameProd = 'uni000D'
			glyphNameFinal = glyphNameProd
		# rename /nbspace to /uni00A0
		if glyphNameProd == 'nbspace' and hasPS != True:
			glyphNameProd = 'uni00A0'
			glyphNameFinal = glyphNameProd
		
		myLine.append(glyphNameFinal)	# final name
		myLine.append(glyphNameProd)	# production name
		if g.unicode != None:
			myLine.append('uni%04X' % g.unicode)	# unicode value
		allLines.append('\t'.join(myLine))
	allLines.append('')   # extra linebreak

	myPath = os.path.join(targetPath, "GlyphOrderAndAliasDB")
	myFile = open(myPath, "w")
	myFile.write(lineBreakChr.join(allLines))
	myFile.close()



def writeFontMenuNameDB(f, targetPath):
	'''write FontMenuNameDB'''
	winSubFamDict = {
		'regular': 'Regular',
		'italic': 'Italic',
		'bold': 'Bold',
		'bold italic': 'Bold Italic'
	}
	macFamName = f.info.familyName
	macSubFamName = f.info.styleName
	winFamName = f.info.styleMapFamilyName
	winSubFamName = winSubFamDict[f.info.styleMapStyleName]
	psFontName = f.info.postscriptFontName

	allLines = []
	allLines.append('[%s]' % psFontName)
	allLines.append('\tf=%s' % macFamName)   # Name ID 16
	allLines.append('\ts=%s' % macSubFamName)   # Name ID 17
	allLines.append('\tl=%s' % winFamName)   # Name ID 1
	fullFontName = winFamName + ' ' + winSubFamName
	if winSubFamName == 'Regular':
		fullFontName = winFamName
	allLines.append('\tm=1,%s' % fullFontName)   # Name ID 18
	allLines.append('')   # extra linebreak

	myPath = os.path.join(targetPath, "FontMenuNameDB")
	myFile = open(myPath, "w")
	myFile.write(lineBreakChr.join(allLines))
	myFile.close()



def writeFeatures(f, targetPath):
	'''write features'''
	allLines = []
	allLines.extend(getHeadTable(f))
	allLines.extend(getNameTable(f))
	allLines.extend(getHheaTable(f))
	allLines.extend(getOS2Table(f))
	allLines.extend(getFeatures(f))

	myPath = os.path.join(targetPath, "features")	
	myFile = open(myPath, "w")
	myFile.write(lineBreakChr.join(allLines))
	myFile.close()



def getHeadTable(f):
	'''get head table'''
	allLines = []
	allLines.append('table head {')
	allLines.append('\tFontRevision %d.%03d;' % (f.info.versionMajor, f.info.versionMinor))
	allLines.append('} head;')
	allLines.append('')
	return allLines



def getNameTable(f):
	'''get name table'''
	allLines = []
	allLines.append('table name {')
	# ID 0: Copyright
	t = stringToUnicode(f.naked().copyright)
	allLines.append('\tnameid 0 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 0 1 "%s";' % unicodeToMacRoman(t))
	# ID 7: trademark
	t = stringToUnicode(f.naked().trademark)
	allLines.append('\tnameid 7 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 7 1 "%s";' % unicodeToMacRoman(t))
	# ID 8: manufacturer name
	t = stringToUnicode(f.naked().source)
	allLines.append('\tnameid 8 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 8 1 "%s";' % unicodeToMacRoman(t))
	# ID 9: designer
	t = stringToUnicode(f.naked().designer)
	allLines.append('\tnameid 9 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 9 1 "%s";' % unicodeToMacRoman(t))
	# ID 11: vendor url
	t = f.info.openTypeNameManufacturerURL
	allLines.append('\tnameid 11 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 11 1 "%s";' % unicodeToMacRoman(t))
	# ID 12: designer url
	t = f.info.openTypeNameDesignerURL
	allLines.append('\tnameid 12 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 12 1 "%s";' % unicodeToMacRoman(t))
	# ID 13: license
	t = stringToUnicode(f.naked().license)
	allLines.append('\tnameid 13 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 13 1 "%s";' % unicodeToMacRoman(t))
	# ID 14: license url
	t = f.info.openTypeNameLicenseURL
	allLines.append('\tnameid 14 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 14 1 "%s";' % unicodeToMacRoman(t))
	# ID 19: sample text
	t = stringToUnicode(f.naked().note)
	allLines.append('\tnameid 19 "%s";' % unicodeToEscapedASCII(t))
	allLines.append('\tnameid 19 1 "%s";' % unicodeToMacRoman(t))
	allLines.append('} name;')
	allLines.append('')
	return allLines



def getHheaTable(f):
	'''get hhea table'''
	allLines = []
	allLines.append('table hhea {')
	allLines.append('\tAscender %s;' % f.info.openTypeHheaAscender)
	x = abs(f.info.openTypeHheaDescender) * -1   # always a negative value
	allLines.append('\tDescender %s;' % x)
	allLines.append('\tLineGap %s;' % f.info.openTypeHheaLineGap)
	allLines.append('} hhea;')
	allLines.append('')
	return allLines



def getOS2Table(f):
	'''get os/2 table'''
	allLines = []
	allLines.append('table OS/2 {')
	embedBits = f.info.openTypeOS2Type
	embedVal = 0
	for myBit in embedBits:
		embedVal += 2 ** myBit
	allLines.append('\tFSType %s;' % embedVal)
	t = ' '.join([str(x) for x in f.info.openTypeOS2Panose])
	allLines.append('\tPanose %s;' % t)
	allLines.append('\tTypoAscender %s;' % f.info.openTypeOS2TypoAscender)
	x = abs(f.info.openTypeOS2TypoDescender) * -1   # always a negative value
	allLines.append('\tTypoDescender %s;' % x)
	allLines.append('\tTypoLineGap %s;' % f.info.openTypeOS2TypoLineGap)
	allLines.append('\twinAscent %s;' % f.info.openTypeOS2WinAscent)
	x = abs(f.info.openTypeOS2WinDescent)   # always a positive value
	allLines.append('\twinDescent %s;' % x)
	t = ' '.join([str(x) for x in f.info.openTypeOS2UnicodeRanges])
	allLines.append('\tUnicodeRange %s;' % t)
	allLines.append('\tXHeight %s;' % f.info.xHeight)
	allLines.append('\tCapHeight %s;' % f.info.capHeight)
	x = f.info.openTypeOS2WeightClass
	allLines.append('\tWeightClass %s;' % x)
	x = f.info.openTypeOS2WidthClass
	allLines.append('\tWidthClass %s;' % x)
	allLines.append('\tVendor "%s";' % f.info.openTypeOS2VendorID.ljust(4))   # fill the name to 4 chars
	allLines.append('} OS/2;')
	allLines.append('')
	return allLines



def getFeatures(f):
	'''get features'''
	feaText = f.naked().ot_classes
	featuresFL = f.naked().features   # list of objects
	for myFea in featuresFL:
		feaText += myFea.value
	feaText = feaText.replace('\r\n', '\r')   # replace windows CRLF by return
	feaText = feaText.replace('\n', '\r')   # replace remaining newline by return
	allLines = feaText.split('\r')
	return allLines



def checkCurveType(f):
	'''analyse outlines to check if font is PostScript or TrueType'''
	typeDict = {}
	for glyphName in f.keys():
		g = f[glyphName]
		for myContour in g:
			for myPoint in myContour.points:
				pType = myPoint.type
				hasType = typeDict.get(pType)
				if hasType == None:
					typeDict[pType] = True

	allTypes = typeDict.keys()
	if 'curve' in allTypes:
		return True
	else:
		return False



def generatePS(f, targetPath):
	'''generate PostScript font'''
	decomposeComp(f)
	# define FontLab Type 1 export options
	flOptions = Options()
	flOptions.T1PFM = 0   # do not export PFM
	flOptions.T1AFM = 0   # do not export AFM and INF
	flOptions.T1UseOS2 = 0   # do not use WinAscent and WinDescent for vertical size
	flOptions.T1Encoding = 1   # always write standard encoding
	flOptions.T1Terminal = 0   # do not open Type 1 export terminal
	f.info.postscriptUniqueID = -1   # remove unique id number
	myPath = os.path.join(targetPath, 'font')
	f.generate('pctype1ascii', myPath)



def generateTTF(f, targetPath):
	'''generate TrueType font'''
	# set FontLab TrueType export options
	flOptions = Options()
	flOptions.TTEExportOT = 0   # (do not) export opentype layout tables
	flOptions.TTEExportVOLT = 0   # (do not) export VOLT data
	flOptions.TTEWriteKernFeature = 0  # (do not) generate kern feature if undefined or outdated
	flOptions.TTEWriteKernTable = 0   # (do not) export old-style kern table
	flOptions.TTEFontNames = 2   # Export only OpenType name table records
	flOptions.OTWriteGDEF = 1   # write gdef table
	flOptions.TTESubrize = 0   # (do not) use subroutines to compress cff data
	flOptions.CopyHDMXData = 1   # copy hdmx data from base to composite glyphs
	flOptions.TTEStoreTables = 1
	createDSIG(f)
	fl.CallCommand(fl_cmd.FontModeCodepages)
	myPath = os.path.join(targetPath, 'font')
	f.generate('otfttf', myPath)



def exportFDKFiles(f, fdkPath):
	fontFilename = os.path.splitext(os.path.basename(f.path))[0]
	targetPath = setDirectory(fdkPath, fontFilename)
	# determine PS or TT outlines
	hasPS = checkCurveType(f)
	# write required FDK files
	print 'exporting fontinfo...'
	writeFontInfo(f, targetPath)
	print 'exporting GlyphOrderAndAliasDB...'
	writeGlyphOrderAndAliasDB(f, targetPath, hasPS)
	print 'exporting FontMenuNameDB...'
	writeFontMenuNameDB(f, targetPath)
	print 'exporting features...'
	writeFeatures(f, targetPath)
	# generate binaries
	if hasPS == True:
		print 'exporting PostScript font...'
		generatePS(f, targetPath)
	else:
		print 'exporting TrueType font...'
		generateTTF(f, targetPath)
	print 'done.'



def run():
	f = CurrentFont()
	if f != None:
		myPath = os.path.dirname(f.path)
		fdkPath = setDirectory(myPath, 'fdk')
		exportFDKFiles(f, fdkPath)
		myFile = f.path
		f.naked().modified = 0
		f.close(False)
		OpenFont(myFile)   # revert font
	else:
		myPath = GetFolder('Select folder with vfb source files')
		if myPath:
			fdkPath = setDirectory(myPath, 'fdk')
			allFiles = getFilePaths(myPath, '.vfb')
			for myFile in allFiles:
				f = OpenFont(myFile)
				print ''
				print 'Processing %s...' % os.path.basename(f.path)
				exportFDKFiles(f, fdkPath)
				f.naked().modified = 0
				f.close(False)



t = '* IBM Plex export for FDK *'
print '-' * len(t)
print t
print '-' * len(t)
if FLmode != True:
	print '* ERROR - this script requires FontLab *'
elif hasRF != True:
	print '* ERROR - this script requires installation of RoboFab library *'
	print 'More info: https://github.com/robofab-developers/robofab'
else:
	run()
