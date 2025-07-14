# سیستم مدیریت آموزشی | Educational Management System

یک سیستم مدیریت آموزشی کامل که با استفاده از Node.js، Express.js و Sequelize ORM توسعه یافته است.

A comprehensive educational management system built with Node.js, Express.js, and Sequelize ORM.

## 🚀 ویژگی‌ها | Features

### 👥 مدیریت کاربران | User Management

- **احراز هویت**: سیستم ورود با OTP
- **نقش‌های کاربری**: ادمین، معلم، دانش‌آموز، کاربر عادی
- **مدیریت پروفایل**: ویرایش اطلاعات شخصی
- **Refresh Token**: مدیریت امن نشست‌ها

### 📚 مدیریت دوره‌ها | Course Management

- **ایجاد دوره**: معلمان می‌توانند دوره‌های جدید ایجاد کنند
- **وضعیت دوره**: پیش‌نویس، در حال برگزاری، به زودی، تکمیل شده، آرشیو شده
- **مدیریت ظرفیت**: تعیین حداکثر تعداد دانش‌آموزان
- **قیمت‌گذاری**: قیمت اصلی و قیمت قابل پرداخت

### 📝 ثبت‌نام و پرداخت | Enrollment & Payment

- **ثبت‌نام در دوره**: دانش‌آموزان می‌توانند در دوره‌ها ثبت‌نام کنند
- **وضعیت ثبت‌نام**: در انتظار، تکمیل شده، ناموفق، لغو شده
- **سیستم پرداخت**: پرداخت آنلاین با درگاه زرین‌پال
- **مدیریت سفارشات**: سیستم کامل مدیریت سفارشات

### 🗓️ مدیریت جلسات | Session Management

- **برنامه‌ریزی جلسات**: تعیین زمان و توضیحات جلسات
- **وضعیت جلسات**: پیش‌نویس، تمام شده، لغو شده، تشکیل نشده

### ✅ حضور و غیاب | Attendance Management

- **ثبت حضور**: حاضر، غائب، تأخیر
- **نوع غیبت**: موجه، غیرموجه
- **گزارش‌گیری**: تولید گزارش‌های حضور و غیاب

### 📊 گزارش‌گیری | Reports

- **گزارش‌های Excel**: تولید گزارش‌های جامع
- **آمار دوره‌ها**: تحلیل عملکرد دوره‌ها
- **گزارش حضور**: آمار حضور و غیاب دانش‌آموزان

## 🛠️ تکنولوژی‌های استفاده شده | Technologies Used

### Backend

- **Node.js**: محیط اجرای JavaScript
- **Express.js**: فریم‌ورک وب
- **Sequelize ORM**: مدیریت پایگاه داده
- **MariaDB**: پایگاه داده
- **JWT**: احراز هویت
- **bcrypt**: رمزگذاری

### Payment & Integration

- **ZarinPal**: درگاه پرداخت
- **Axios**: درخواست‌های HTTP

### Documentation & Monitoring

- **Swagger**: مستندات API
- **Pino**: سیستم لاگ
- **ExcelJS**: تولید فایل‌های Excel

### Development Tools

- **Nodemon**: توسعه
- **Sequelize CLI**: مدیریت migration ها
- **Joi**: اعتبارسنجی داده‌ها
- **CORS**: مدیریت Cross-Origin

## 📋 پیش‌نیازها | Prerequisites

- Node.js (نسخه 16 یا بالاتر)
- MariaDB/MySQL
- npm یا yarn

## 🔧 نصب و راه‌اندازی | Installation & Setup

### 1. کلون کردن پروژه | Clone the Project

```bash
git clone <repository-url>
cd edu-express-sequelize
```

### 2. نصب وابستگی‌ها | Install Dependencies

```bash
npm install
```

### 3. تنظیمات پایگاه داده | Database Configuration

فایل `config/config.json` را ویرایش کنید:

```json
{
  "development": {
    "username": "your-db-username",
    "password": "your-db-password",
    "database": "edu-db",
    "host": "127.0.0.1",
    "dialect": "mariadb"
  }
}
```

### 4. تنظیمات محیط | Environment Variables

فایل `.env` ایجاد کنید:

```env
PORT=3000
JWT_SECRET=your-jwt-secret
DB_HOST=localhost
DB_USER=your-db-user
DB_PASS=your-db-password
DB_NAME=edu-db
```

### 5. اجرای Migration ها | Run Migrations

```bash
npx sequelize-cli db:migrate
```

### 6. اجرای Seeder ها | Run Seeders

```bash
npx sequelize-cli db:seed:all
```

### 7. اجرای برنامه | Start the Application

```bash
npm start
```

## 🌐 API Endpoints

### Authentication

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/verify-otp`
- `POST /auth/refresh-token`

### Courses

- `GET /course`
- `POST /course`
- `PUT /course/:id`
- `DELETE /course/:id`
- `GET /course/:id/session`
- `GET /course/:id/students`
- `GET /course/complete-stats`

### Enrollment

- `POST /enrollment`
- `GET /enrollment`
- `GET /enrolled-students`
- `PUT /enrollment/:id/cancel`

### Sessions

- `GET /session`
- `GET /session/:id`
- `POST /session`
- `PUT /session/:id`
- `DELETE /session/:id`

### Attendance

- `POST /attendance`
- `GET /attendance`
- `PUT /attendance/:id`
- `DELETE /attendance/:id`

### Payment

- `POST /payment`
- `GET /payment/verify`

### Profile

- `PUT /profile`
- `GET /profile`

### Student

- `GET /student`

### Teacher

- `GET /teacher`
- `GET /popluar`
- `GET /excel`

### Role

- `PUT /role`

## 📊 ساختار پایگاه داده | Database Structure

### Main Tables

- **user**: کاربران سیستم
- **profile**: اطلاعات پروفایل کاربران
- **course**: دوره‌های آموزشی
- **enrollment**: ثبت‌نام‌ها
- **session**: جلسات آموزشی
- **attendance**: حضور و غیاب
- **order**: سفارشات
- **payment**: پرداخت‌ها

### Relationships

- یک کاربر می‌تواند چندین دوره تدریس کند (معلم)
- یک کاربر می‌تواند در چندین دوره ثبت‌نام کند (دانش‌آموز)
- هر دوره می‌تواند چندین جلسه داشته باشد
- هر جلسه می‌تواند چندین رکورد حضور و غیاب داشته باشد

## 📚 مستندات API | API Documentation

پس از اجرای برنامه، مستندات Swagger در آدرس زیر در دسترس است:

```
http://localhost:3000/swagger
```

## 🔐 User Roles

### ادمین (Admin)

- مدیریت کامل سیستم
- مشاهده تمام گزارش‌ها
- مدیریت کاربران

### معلم (Teacher)

- ایجاد و مدیریت دوره‌ها
- مدیریت جلسات
- ثبت حضور و غیاب
- مشاهده گزارش‌های دوره‌های خود

### دانش‌آموز (Student)

- ثبت‌نام در دوره‌ها
- مشاهده جلسات
- مشاهده وضعیت حضور و غیاب خود

### کاربر عادی (User)

- مشاهده دوره‌ها
- امکان ارتقاء به دانش‌آموز

## 📝 Logging

سیستم از Pino برای لاگ‌گیری استفاده می‌کند. لاگ‌ها شامل:

- اطلاعات درخواست‌ها
- خطاهای سیستم
- عملیات پایگاه داده

## 🚀 Deployment

### Production Environment

1. تنظیم متغیرهای محیط production
2. اجرای migration ها
3. تنظیم وب سرور (Nginx)
4. استفاده از PM2 برای مدیریت فرآیند

---

**نکته**: این پروژه برای اهداف آموزشی توسعه یافته است و ممکن است نیاز به تنظیمات اضافی برای استفاده در محیط production داشته باشد.
