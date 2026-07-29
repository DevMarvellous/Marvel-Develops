import qrcode

def create_qr(url, filename):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=1, 
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)
    print(f"QR Code generated for {url} -> {filename}")

create_qr('https://marveldevelops.com', 'public/qrcode.png')
create_qr('https://marveldevelops.com/academy', 'public/academy/qrcode.png')
