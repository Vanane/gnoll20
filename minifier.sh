output=gnoll20.js

rm "$output" && touch "$output"
while read -r f; do
	cat "$f" >> "$output.tmp"
done < "deps.txt"
tr '\t\r\n' ' '  < "$output.tmp" | tr -s ' ' > "$output"
rm "$output.tmp"
