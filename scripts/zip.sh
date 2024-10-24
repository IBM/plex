cd zip
find . -name '.DS_Store' -type f -delete
for i in */; do zip -qr "${i%/}.zip" "$i"; done