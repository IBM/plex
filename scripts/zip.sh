cd zip
for i in */; do zip -qr "${i%/}.zip" "$i"; done