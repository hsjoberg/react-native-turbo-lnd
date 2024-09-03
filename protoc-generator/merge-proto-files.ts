/* eslint-disable */
import { basename } from "https://deno.land/std/path/mod.ts";

async function mergeProtoFiles(mainFile: string, ...filesToMerge: string[]) {
  // Read the main file
  let mainContent = await Deno.readTextFile(mainFile);

  // Process each file to merge
  for (const file of filesToMerge) {
    const content = await Deno.readTextFile(file);

    // Find the first export statement
    const exportIndex = content.indexOf('export const');

    if (exportIndex !== -1) {
      // Extract the relevant content starting from the first export
      const relevantContent = content.slice(exportIndex).trim();

      // Append the relevant content
      if (relevantContent) {
        mainContent += '\n\n\n\n// Merged from ' + basename(file) + '\n' + relevantContent;
      }
    } else {
      console.warn(`No export statement found in ${file}. Skipping this file.`);
    }
  }

  // Write the merged content back to the main file
  await Deno.writeTextFile(mainFile, mainContent);
  console.log(`[protoc-generator] Merged ${filesToMerge.join(", ")} into ${mainFile}`);
}

if (import.meta.main) {
  await mergeProtoFiles(
    'build/proto/lightning_pb.ts',
    'build/proto/walletunlocker_pb.ts',
    'build/proto/stateservice_pb.ts'
  );
  await mergeProtoFiles(
    'build/proto/chainrpc/chainnotifier_pb.ts',
    'build/proto/chainrpc/chainkit_pb.ts',
  );
}
