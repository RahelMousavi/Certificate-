# Rahele's Certificate Archive

ساختار پروژه مرتب شده و ظاهر فعلی سایت عمداً تغییر داده نشده است. فایل‌های گواهی از HTML جدا شده‌اند تا اضافه‌کردن گواهی جدید ساده باشد.

## ساختار پوشه‌ها

- `index.html` — ساختار صفحه و تمام استایل‌های فعلی
- `data/certificates.js` — فهرست اطلاعات گواهی‌ها
- `js/app.js` — منطق فیلتر، جست‌وجو و نمایش گواهی
- `assets/certificates/` — فایل تصویر یا PDF گواهی‌ها

## افزودن گواهی جدید

۱. تصویر یا PDF گواهی را در پوشه `assets/certificates/` قرار بده؛ نام فایل را انگلیسی و بدون فاصله انتخاب کن.

۲. یک شیء جدید به آرایه `certificates` در `data/certificates.js` اضافه کن:

```js
{
  title: "Certificate Title",
  category: "Cybersecurity & IT",
  issuer: "Certificate Provider",
  date: "November 24, 2026",
  id: "CERTIFICATE-ID",
  kind: "image",
  data: "assets/certificates/new-certificate.jpg"
}
```

برای فایل PDF مقدار `kind` را `pdf` قرار بده و مسیر فایل PDF را در `data` بنویس.

نکته: مسیر `data` نسبت به فایل `index.html` نوشته می‌شود. بنابراین از `assets/certificates/...` استفاده کن، نه `../assets/...`.

۳. صفحه را با یک وب‌سرور محلی اجرا کن. برای مثال، در ترمینال و داخل پوشه پروژه:

```bash
python -m http.server 8000
```

سپس آدرس `http://localhost:8000` را در مرورگر باز کن. اجرای مستقیم `index.html` با `file://` ممکن است به‌خاطر محدودیت مرورگر در بارگذاری فایل‌های محلی درست کار نکند.

## نکته درباره ظاهر

CSS، رنگ‌ها، فونت‌ها، چیدمان، متن‌ها، کارت‌ها، فیلترها و پنجره پیش‌نمایش در `index.html` دست‌نخورده نگه داشته شده‌اند. فقط داده‌ها و منطق JavaScript به فایل‌های جدا منتقل شده‌اند.
