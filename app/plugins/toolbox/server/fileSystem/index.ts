import Archiver from 'archiver'
import Decompress from 'decompress'
import * as fs from 'fs'
import FsExtra from 'fs-extra'
import * as os from 'os'
import * as Path from 'path'
import { join } from 'path'
import { UtilityTool } from '../../common/utility'

type FileType = 'pdf' | 'csv' | 'docx' | 'unknown'

export namespace FileSystemTool {
  export function getRoot(): string {
    return process.cwd()
  }

  export function findFileContent(path: string): string {
    return fs.readFileSync(path, 'utf-8')
  }

  export function findFolderContent(pathAbsolute: string): string[] {
    const names = fs.readdirSync(pathAbsolute) ?? []
    const files = names.map(name => `${pathAbsolute}/${name}`)

    return files
  }
  export function writeFolder(path: string): void {
    fs.mkdirSync(path, { recursive: true })
  }

  export async function getFileBuffer(file: File): Promise<Buffer> {
    return Buffer.from(await file.arrayBuffer())
  }

  export function writeFile(path: string, content: string | Buffer): void {
    const pathFolder = path.split('/').slice(0, -1).join('/')

    writeFolder(pathFolder)

    return fs.writeFileSync(path, content)
  }

  export function joinPaths(...paths: string[]): string {
    return join(...paths)
  }

  export function createReadStream(path: string): fs.ReadStream {
    return fs.createReadStream(path)
  }

  export function buildTemporaryPath(path: string): string {
    const pathTemporary = Path.join(os.tmpdir(), 'marblism-tmp', path)
    return pathTemporary
  }

  export async function createReadStreamFromArrayBuffer(
    arrayBuffer: ArrayBuffer,
    filename: string,
  ) {
    const path = buildTemporaryPath(filename)

    const pathFolder = path.split('/').slice(0, -1).join('/')

    deleteFolder(pathFolder)

    writeFolder(pathFolder)

    fs.writeFileSync(path, Buffer.from(arrayBuffer))

    return fs.createReadStream(path)
  }

  export async function deleteFile(path: string): Promise<void> {
    fs.unlinkSync(path)
  }

  export function deleteFolder(path: string): void {
    try {
      fs.rmdirSync(path, { recursive: true })
    } catch (error) {
      // ignore
    }
  }

  export function getFileType(filename: string, buffer?: Buffer): FileType {
    if (filename.endsWith('.csv')) {
      return 'csv'
    }

    if (filename.endsWith('.pdf')) {
      return 'pdf'
    }

    if (filename.endsWith('.docx') || filename.endsWith('.doc')) {
      return 'docx'
    }

    if (UtilityTool.isNull(buffer)) {
      return 'unknown'
    }

    const signatures = {
      pdf: [0x25, 0x50, 0x44, 0x46],
      docx: [0x50, 0x4b, 0x03, 0x04],
      csv: [0x22, 0x2c, 0x0a],
    }

    for (const [type, signature] of Object.entries(signatures)) {
      if (signature.every((byte, index) => buffer[index] === byte)) {
        return type as FileType
      }
    }

    return 'unknown'
  }

  export function move(
    pathSourceAbsolute: string,
    pathDestinationAbsolute: string,
  ) {
    FsExtra.moveSync(pathSourceAbsolute, pathDestinationAbsolute, {
      overwrite: true,
    })
  }

  export function createFolder(pathFolderAbsolute: string): void {
    fs.mkdirSync(pathFolderAbsolute, { recursive: true })
  }

  export function createFile(pathAbsolute: string, content): void {
    fs.writeFileSync(pathAbsolute, content)
  }

  export function isFolder(pathAbsolute: string): boolean {
    const information = fs.statSync(pathAbsolute)
    return information.isDirectory()
  }

  export function isFile(path: string): boolean {
    return !isFolder(path)
  }

  export async function zip(
    files: { pathInput: string; pathOutput: string }[],
    pathZipOutput: string,
  ) {
    const output = fs.createWriteStream(pathZipOutput)

    const archive = Archiver('zip', {
      zlib: { level: 9 }, // Compression level
    })

    archive.pipe(output)

    files.forEach(file => {
      archive.append(fs.createReadStream(file.pathInput), {
        name: file.pathOutput,
      })
    })

    await archive.finalize()

    return
  }

  export async function unZip(
    pathFile: string,
    pathFolderOutput: string,
  ): Promise<string> {
    await Decompress(pathFile, pathFolderOutput)
      .then(files => {
        console.log(files)
      })
      .catch(error => {
        console.log(error)
      })

    const folderName = pathFile.split('/').slice(-1)[0].replace('.zip', '')

    return `${pathFolderOutput}/${folderName}`
  }
}