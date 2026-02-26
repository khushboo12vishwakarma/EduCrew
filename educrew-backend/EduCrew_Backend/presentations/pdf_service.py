import subprocess
import os
import sys
from pathlib import Path


class PDFConverter:
    """Convert PPTX to PDF using LibreOffice"""

    @staticmethod
    def pptx_to_pdf(pptx_path: str, pdf_path: str = None) -> str:
        """
        Convert PPTX file to PDF
        """
        if not os.path.exists(pptx_path):
            raise FileNotFoundError(f"PPTX file not found: {pptx_path}")

        if pdf_path is None:
            pdf_path = pptx_path.replace('.pptx', '.pdf')

        output_dir = os.path.dirname(pdf_path)
        os.makedirs(output_dir, exist_ok=True)

        try:
            # Detect OS and use appropriate LibreOffice path
            if sys.platform == "win32":
                # Windows: Try common installation paths
                libreoffice_paths = [
                    "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
                    "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe",
                    "libreoffice"
                ]
                libreoffice_cmd = None
                for path in libreoffice_paths:
                    if os.path.exists(path):
                        libreoffice_cmd = path
                        break
                if not libreoffice_cmd:
                    libreoffice_cmd = "libreoffice"
            else:
                # Mac/Linux
                libreoffice_cmd = "libreoffice"

            print(f"[PDF] Using LibreOffice: {libreoffice_cmd}")
            print(f"[PDF] Converting: {pptx_path} → {pdf_path}")

            command = [
                libreoffice_cmd,
                '--headless',
                '--convert-to', 'pdf',
                '--outdir', output_dir,
                pptx_path
            ]

            print(f"[PDF] Command: {' '.join(command)}")

            result = subprocess.run(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=120,
                shell=False
            )

            print(f"[PDF] Return code: {result.returncode}")
            if result.stdout:
                print(f"[PDF] STDOUT: {result.stdout.decode()}")
            if result.stderr:
                print(f"[PDF] STDERR: {result.stderr.decode()}")

            if result.returncode != 0:
                error_msg = result.stderr.decode() if result.stderr else "Unknown error"
                raise Exception(f"LibreOffice conversion failed: {error_msg}")

            # Check if PDF was created
            generated_pdf = os.path.join(output_dir, os.path.basename(pptx_path).replace('.pptx', '.pdf'))
            
            if os.path.exists(generated_pdf):
                print(f"[PDF] ✓ PDF created successfully: {generated_pdf}")
                return generated_pdf
            else:
                raise Exception(f"PDF file was not created at: {generated_pdf}")

        except FileNotFoundError as e:
            raise Exception(f"LibreOffice not found: {str(e)}. Install from https://www.libreoffice.org/download/")
        except subprocess.TimeoutExpired:
            raise Exception("PDF conversion timeout (>120s)")
        except Exception as e:
            print(f"[PDF] ERROR: {str(e)}")
            raise
