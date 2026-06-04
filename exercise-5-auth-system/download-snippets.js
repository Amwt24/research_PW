import fs from 'fs';
import path from 'path';

const REGISTRY_URL = "https://chakra-v3-docs.vercel.app";
const TARGET_DIR = path.join(process.cwd(), 'src', 'components', 'ui');

async function downloadSnippets() {
  console.log("Fetching compositions index...");
  const response = await fetch(`${REGISTRY_URL}/compositions/index.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch index: ${response.statusText}`);
  }
  const compositions = await response.json();
  console.log(`Found ${compositions.length} compositions.`);

  // Create target directory if it doesn't exist
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(`Created directory: ${TARGET_DIR}`);
  }

  // We can download all of them, or just download what is commonly used.
  // Let's download all of them so we have a full library of snippets!
  for (const comp of compositions) {
    const id = comp.id;
    console.log(`Fetching composition: ${id}...`);
    try {
      const compRes = await fetch(`${REGISTRY_URL}/compositions/${id}.json`);
      if (!compRes.ok) {
        console.error(`Failed to fetch composition ${id}: ${compRes.statusText}`);
        continue;
      }
      const data = await compRes.json();
      const fileName = data.file.name;
      // Replace "compositions/ui" in imports with local directory structure if needed,
      // and write the content
      const content = data.file.content.replace(/compositions\/ui/g, ".");
      const filePath = path.join(TARGET_DIR, fileName);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Saved: ${fileName}`);
    } catch (err) {
      console.error(`Error downloading ${id}:`, err);
    }
  }
  console.log("Done downloading all snippets!");
}

downloadSnippets().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
