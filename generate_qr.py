import qrcode

url = 'https://marveldevelops.com'

# Configure the QR code to have a very small border (border=1 instead of default 4)
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=1, 
)

qr.add_data(url)
qr.make(fit=True)

# Generate and overwrite the old image
img = qr.make_image(fill_color="black", back_color="white")
img.save('public/qrcode.png')
print("QR Code with small border successfully generated and replaced the old one at public/qrcode.png!")
