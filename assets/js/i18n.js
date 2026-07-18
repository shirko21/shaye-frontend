(function(){
  'use strict';
  var KEY='shaye_language';
  var supported=['en','fa','ru','ar'];
  var meta={
    en:{name:'English',flag:'🇬🇧',dir:'ltr'},
    fa:{name:'فارسی',flag:'🇮🇷',dir:'rtl'},
    ru:{name:'Русский',flag:'🇷🇺',dir:'ltr'},
    ar:{name:'العربية',flag:'🇸🇦',dir:'rtl'}
  };
  var en={
    'خانه':'Home','کیف پول':'Wallet','تیم':'Team','وظایف':'Tasks','گزارش':'Reports','برداشت':'Withdraw','واریز':'Deposit','ورود':'Login','ثبت نام':'Register','ثبت‌نام':'Register','خروج از حساب':'Logout','منوی اصلی':'Main menu',
    'داشبورد | SHAYE':'Dashboard | SHAYE','کیف پول 💳':'Wallet 💳','تیم من 👥':'My Team 👥','وظایف روزانه 📋':'Daily Tasks 📋','گزارش‌ها 📊':'Reports 📊','برداشت 💸':'Withdraw 💸','شارژ سرمایه 💳':'Deposit 💳',
    'خوش آمدید 👋':'Welcome 👋','به پنل شخصی SHAYE خوش آمدید':'Welcome to your SHAYE account','خلاصه حساب':'Account Summary','خلاصه مالی':'Financial Summary','سرمایه':'Investment','سرمایه کل':'Total Investment','موجودی برداشت':'Withdraw Balance','موجودی قابل برداشت':'Available Balance','سود امروز':'Today’s Profit','پورسانت تیم':'Team Commission','سطح فعال':'Active Level','سطح فعال شما':'Your Active Level','بدون VIP':'No VIP','سطوح VIP':'VIP Levels','ارتقا به VIP':'Upgrade to VIP','مشاهده سطح فعال':'View Active Level','وضعیت سرمایه':'Investment Status','مجموع همه واریزهای تأییدشده':'Total confirmed deposits','این موجودی قابل برداشت نیست.':'This balance cannot be withdrawn.','سودها، پاداش‌ها و کمیسیون‌ها':'Profits, rewards and commissions','سودها و کمیسیون‌ها به این بخش اضافه می‌شوند.':'Profits and commissions are added here.',
    'ورود به SHAYE':'Login to SHAYE','خوش آمدید، وارد حساب خود شوید':'Welcome, sign in to your account','ایمیل':'Email','رمز عبور':'Password','ورود به حساب':'Sign In','حساب ندارید؟':'Don’t have an account?','ساخت حساب':'Create Account','ساخت حساب SHAYE':'Create SHAYE Account','حساب شخصی خود را ایجاد کنید':'Create your personal account','تکرار رمز عبور':'Confirm Password','کد دعوت (اختیاری)':'Referral Code (Optional)','حساب دارید؟':'Already have an account?','ثبت‌نام موفق بود؛ در حال ورود...':'Registration successful. Signing in...','ورود موفق بود؛ در حال انتقال به حساب...':'Login successful. Redirecting...','لطفاً ایمیل و رمز عبور را وارد کنید.':'Please enter your email and password.','ایمیل یا رمز عبور اشتباه است.':'Incorrect email or password.','این ایمیل قبلاً ثبت شده است.':'This email is already registered.','تکرار رمز یکسان نیست.':'Passwords do not match.','ایمیل واردشده معتبر نیست.':'Please enter a valid email address.','رمز عبور باید حداقل ۴ کاراکتر باشد.':'Password must be at least 4 characters.','کد دعوت واردشده معتبر نیست.':'The referral code is invalid.',
    'واریز سرمایه':'Investment Deposit','واریز USDT روی شبکه BEP20':'Deposit USDT on BEP20','آدرس واریز':'Deposit Address','کپی آدرس':'Copy Address','مبلغ USDT':'USDT Amount','ثبت واریز تأییدشده':'Confirm Deposit','راهنمای شارژ':'Deposit Guide','شبکه انتقال':'Transfer Network','مبلغ واریز تأییدشده':'Confirmed Deposit Amount','آدرس با موفقیت کپی شد':'Address copied successfully','مبلغ واریز را به‌درستی وارد کنید':'Enter a valid deposit amount','واریز با موفقیت ثبت شد.':'Deposit recorded successfully.','برداشت مستقیم USDT':'Direct USDT Withdrawal','برداشت مستقیم از موجودی قابل برداشت':'Withdraw from available balance','آدرس کیف پول USDT در شبکه BEP20':'USDT BEP20 Wallet Address','مبلغ برداشت':'Withdrawal Amount','گذرواژه برداشت':'Withdrawal Password','ثبت برداشت':'Submit Withdrawal','شبکه برداشت':'Withdrawal Network','مبلغ را وارد کنید':'Enter amount','لطفاً مبلغ برداشت معتبر وارد کنید.':'Enter a valid withdrawal amount.','مبلغ برداشت بیشتر از موجودی قابل برداشت شماست.':'Withdrawal amount exceeds your available balance.','گذرواژه برداشت نادرست است.':'Incorrect withdrawal password.','با موفقیت برداشت و در گزارش‌ها ثبت شد.':'Withdrawal recorded successfully.',
    'تیم من | SHAYE':'My Team | SHAYE','اعضای تیم':'Team Members','اعضای مستقیم':'Direct Members','کل اعضای ۳ سطح':'Total 3-Level Members','پورسانت کل':'Total Commission','لینک دعوت شما':'Your Referral Link','کپی لینک دعوت':'Copy Referral Link','آمار تیم':'Team Statistics','سطح ۱':'Level 1','سطح ۲':'Level 2','سطح ۳':'Level 3','عضو سطح ۱':'Level 1 Member','عضو سطح ۲':'Level 2 Member','عضو سطح ۳':'Level 3 Member','لینک دعوت با موفقیت کپی شد.':'Referral link copied successfully.','در این سطح هنوز عضوی وجود ندارد.':'No members at this level yet.',
    'وظایف روزانه | SHAYE':'Daily Tasks | SHAYE','وظیفه روزانه':'Daily Task','وظیفه روزانه VIP':'VIP Daily Task','تکمیل وظیفه':'Complete Task','وظایف انجام‌شده':'Completed Tasks','وظایف تکمیل‌شده':'Completed Tasks','آماده انجام':'Ready','تکمیل‌شده':'Completed','پاداش وظیفه':'Task Reward','پاداش بلافاصله به موجودی قابل برداشت افزوده می‌شود.':'The reward is added immediately to your available balance.','این وظیفه قبلاً تکمیل شده است.':'This task has already been completed.','وظیفه تکمیل شد و':'Task completed and','به موجودی قابل برداشت شما اضافه شد.':'was added to your available balance.','هنوز وظیفه‌ای تکمیل نشده است.':'No task has been completed yet.',
    'گزارش‌ها | SHAYE':'Reports | SHAYE','تاریخچه تراکنش‌ها':'Transaction History','همه':'All','سود':'Profit','پورسانت':'Commission','جایزه':'Prize','وضعیت':'Status','مبلغ':'Amount','تاریخ نامشخص':'Unknown Date','در این بخش هنوز تراکنشی ثبت نشده است.':'No transactions have been recorded yet.','هنوز تراکنشی ثبت نشده است.':'No transactions have been recorded yet.','تراکنش':'Transaction','تأییدشده':'Confirmed','در انتظار':'Pending','ردشده':'Rejected',
    'گردونه جایزه SHAYE':'SHAYE Prize Wheel','بچرخون':'SPIN','فرصت باقی‌مانده':'Spins Remaining','در حال حاضر فرصت گردونه ندارید.':'You currently have no spins available.','گردونه در حال چرخش است...':'The wheel is spinning...','تبریک!':'Congratulations!','جایزه نقدی':'Cash Prize','جایزه فعال نیست':'Prize is inactive','بستن':'Close',
    'پنل مدیریت SHAYE':'SHAYE Admin Panel','مدیریت SHAYE':'SHAYE Administration','مدیریت آمار، VIP، گردونه، پیام‌ها و کاربران در یک صفحه':'Manage statistics, VIP, wheel, messages and users in one place','داشبورد آماری':'Statistics Dashboard','کل کاربران':'Total Users','کاربران مسدود':'Blocked Users','مجموع سرمایه':'Total Investment','کل برداشت':'Total Withdrawals','جوایز گردونه':'Wheel Prizes','به‌روزرسانی آمار':'Refresh Statistics','تنظیم سطوح VIP و سود روزانه':'Configure VIP Levels and Daily Profit','حداقل سرمایه':'Minimum Investment','سود روزانه (%)':'Daily Profit (%)','مدت فعال بودن':'Active Duration','روز':'Days','ذخیره تنظیمات':'Save Settings','بازگردانی پیش‌فرض':'Restore Defaults','مدیریت گردونه':'Wheel Management','وضعیت گردونه':'Wheel Status','فعال باشد':'Enabled','مدت چرخش (میلی‌ثانیه)':'Spin Duration (ms)','فرصت اولیه ثبت‌نام':'Registration Spins','فرصت دعوت مستقیم':'Direct Referral Spins','ذخیره تنظیمات گردونه':'Save Wheel Settings','جایزه‌ها':'Prizes','افزودن جایزه':'Add Prize','نام جایزه':'Prize Name','وزن شانس':'Winning Weight','فعال':'Active','غیرفعال':'Inactive','حذف':'Delete','ذخیره':'Save','فرصت کاربران':'User Spins','جستجو با ایمیل':'Search by Email','جستجوی ایمیل':'Search Email','به‌روزرسانی':'Update','تاریخچه گردونه':'Wheel History','به‌روزرسانی تاریخچه':'Refresh History','پیام و تصویر':'Message & Image','پیام پاپ‌آپ صفحه خانه':'Home Popup Message','عنوان':'Title','متن پیام':'Message Text','آدرس تصویر':'Image URL','یا انتخاب تصویر از دستگاه':'Or choose an image from device','متن دکمه اختیاری':'Optional Button Text','لینک دکمه':'Button Link','اولویت نمایش':'Display Priority','شروع نمایش (اختیاری)':'Start Time (Optional)','پایان نمایش (اختیاری)':'End Time (Optional)','پیام فعال باشد':'Message Enabled','پیش‌نمایش':'Preview','ثبت پیام':'Save Message','پیام‌های ثبت‌شده':'Saved Messages','پیامی ثبت نشده است.':'No message has been saved.','مدیریت حساب کاربران':'User Account Management','جستجوی کاربر یا جایزه':'Search user or prize','سرمایه جدید':'New Investment','موجودی برداشت':'Withdraw Balance','سطح انتخاب‌شده':'Selected Level','مسدودکردن':'Block','رفع مسدودی':'Unblock','اطلاعات کاربر ذخیره شد.':'User information saved.','امنیت مدیریت':'Admin Security','نام کاربری مدیر':'Admin Username','رمز عبور مدیر':'Admin Password','رمز جدید مدیر':'New Admin Password','تکرار رمز':'Confirm Password','تغییر رمز مدیر':'Change Admin Password','خروج از پنل مدیریت':'Exit Admin Panel','ورود به مدیریت':'Admin Login','ورود مدیر':'Admin Login','راه‌اندازی مدیر':'Create Admin','نام کاربری':'Username','ساخت حساب مدیر':'Create Admin Account',
    'پیام مدیریت':'Management Message','اطلاعیه مهم':'Important Notice','ارتباط با پشتیبانی':'Contact Support','پیام بدون عنوان':'Untitled Message','نمایش را می‌بندد.':'closes the display.','حجم تصویر باید کمتر از ۱.۵ مگابایت باشد.':'Image size must be under 1.5 MB.','حداقل متن یا تصویر وارد کنید.':'Enter at least text or an image.','پیام ذخیره شد و در صفحه خانه نمایش داده می‌شود.':'Message saved and will appear on the home page.','این پیام حذف شود؟':'Delete this message?','آیا می‌خواهید از حساب کاربری خارج شوید؟':'Do you want to log out?','حساب شما توسط مدیریت مسدود شده است':'Your account has been blocked by management','کاربر':'User','ندارد':'None','صفرکردن':'Reset','جستجو':'Search'
  };
  var ru={
    'Home':'Главная','Wallet':'Кошелёк','Team':'Команда','Tasks':'Задания','Reports':'Отчёты','Withdraw':'Вывод','Deposit':'Пополнение','Login':'Войти','Register':'Регистрация','Logout':'Выйти','Main menu':'Главное меню','Welcome 👋':'Добро пожаловать 👋','Account Summary':'Сводка счёта','Financial Summary':'Финансовая сводка','Investment':'Инвестиции','Total Investment':'Общие инвестиции','Withdraw Balance':'Баланс вывода','Available Balance':'Доступный баланс','Today’s Profit':'Прибыль сегодня','Team Commission':'Комиссия команды','Active Level':'Активный уровень','Your Active Level':'Ваш активный уровень','No VIP':'Без VIP','VIP Levels':'Уровни VIP','Upgrade to VIP':'Повысить VIP','View Active Level':'Посмотреть активный уровень','Email':'Эл. почта','Password':'Пароль','Sign In':'Войти','Create Account':'Создать аккаунт','Confirm Password':'Повторите пароль','Referral Code (Optional)':'Реферальный код (необязательно)','Deposit Address':'Адрес пополнения','Copy Address':'Копировать адрес','USDT Amount':'Сумма USDT','Confirm Deposit':'Подтвердить пополнение','Direct USDT Withdrawal':'Вывод USDT','Withdrawal Amount':'Сумма вывода','Withdrawal Password':'Пароль вывода','Submit Withdrawal':'Отправить заявку','Team Members':'Участники команды','Direct Members':'Прямые участники','Your Referral Link':'Ваша реферальная ссылка','Copy Referral Link':'Копировать ссылку','Daily Task':'Ежедневное задание','Complete Task':'Выполнить задание','Completed Tasks':'Выполненные задания','Ready':'Готово','Completed':'Завершено','Transaction History':'История транзакций','All':'Все','Profit':'Прибыль','Commission':'Комиссия','Prize':'Приз','Status':'Статус','Amount':'Сумма','Confirmed':'Подтверждено','Pending':'Ожидает','Rejected':'Отклонено','SHAYE Prize Wheel':'Колесо призов SHAYE','SPIN':'КРУТИТЬ','Spins Remaining':'Осталось вращений','Congratulations!':'Поздравляем!','Cash Prize':'Денежный приз','Close':'Закрыть','SHAYE Admin Panel':'Панель администратора SHAYE','Statistics Dashboard':'Панель статистики','Total Users':'Всего пользователей','Blocked Users':'Заблокированные','Total Withdrawals':'Всего выводов','Wheel Prizes':'Призы колеса','Refresh Statistics':'Обновить статистику','Save Settings':'Сохранить настройки','Restore Defaults':'Восстановить','Wheel Management':'Управление колесом','Wheel Status':'Статус колеса','Enabled':'Включено','Prizes':'Призы','Add Prize':'Добавить приз','Prize Name':'Название приза','Winning Weight':'Вес шанса','Active':'Активно','Inactive':'Неактивно','Delete':'Удалить','Save':'Сохранить','Message & Image':'Сообщение и изображение','Title':'Заголовок','Message Text':'Текст сообщения','Image URL':'URL изображения','Preview':'Предпросмотр','Save Message':'Сохранить сообщение','Saved Messages':'Сохранённые сообщения','User Account Management':'Управление пользователями','Search by Email':'Поиск по эл. почте','Block':'Заблокировать','Unblock':'Разблокировать','Admin Security':'Безопасность администратора','Admin Username':'Имя администратора','Admin Password':'Пароль администратора','New Admin Password':'Новый пароль','Change Admin Password':'Изменить пароль','Exit Admin Panel':'Выйти из панели','Admin Login':'Вход администратора','Username':'Имя пользователя','Contact Support':'Связаться с поддержкой','Important Notice':'Важное уведомление','Management Message':'Сообщение администрации','None':'Нет','Reset':'Сбросить','Search':'Поиск'
  };
  var ar={
    'Home':'الرئيسية','Wallet':'المحفظة','Team':'الفريق','Tasks':'المهام','Reports':'التقارير','Withdraw':'سحب','Deposit':'إيداع','Login':'تسجيل الدخول','Register':'إنشاء حساب','Logout':'تسجيل الخروج','Main menu':'القائمة الرئيسية','Welcome 👋':'مرحباً 👋','Account Summary':'ملخص الحساب','Financial Summary':'الملخص المالي','Investment':'الاستثمار','Total Investment':'إجمالي الاستثمار','Withdraw Balance':'رصيد السحب','Available Balance':'الرصيد المتاح','Today’s Profit':'ربح اليوم','Team Commission':'عمولة الفريق','Active Level':'المستوى النشط','Your Active Level':'مستواك النشط','No VIP':'بدون VIP','VIP Levels':'مستويات VIP','Upgrade to VIP':'ترقية VIP','View Active Level':'عرض المستوى النشط','Email':'البريد الإلكتروني','Password':'كلمة المرور','Sign In':'دخول','Create Account':'إنشاء حساب','Confirm Password':'تأكيد كلمة المرور','Referral Code (Optional)':'رمز الدعوة (اختياري)','Deposit Address':'عنوان الإيداع','Copy Address':'نسخ العنوان','USDT Amount':'مبلغ USDT','Confirm Deposit':'تأكيد الإيداع','Direct USDT Withdrawal':'سحب USDT مباشر','Withdrawal Amount':'مبلغ السحب','Withdrawal Password':'كلمة مرور السحب','Submit Withdrawal':'إرسال طلب السحب','Team Members':'أعضاء الفريق','Direct Members':'الأعضاء المباشرون','Your Referral Link':'رابط دعوتك','Copy Referral Link':'نسخ رابط الدعوة','Daily Task':'المهمة اليومية','Complete Task':'إكمال المهمة','Completed Tasks':'المهام المكتملة','Ready':'جاهز','Completed':'مكتمل','Transaction History':'سجل المعاملات','All':'الكل','Profit':'الربح','Commission':'العمولة','Prize':'الجائزة','Status':'الحالة','Amount':'المبلغ','Confirmed':'مؤكد','Pending':'قيد الانتظار','Rejected':'مرفوض','SHAYE Prize Wheel':'عجلة جوائز SHAYE','SPIN':'تدوير','Spins Remaining':'الفرص المتبقية','Congratulations!':'تهانينا!','Cash Prize':'جائزة نقدية','Close':'إغلاق','SHAYE Admin Panel':'لوحة إدارة SHAYE','Statistics Dashboard':'لوحة الإحصاءات','Total Users':'إجمالي المستخدمين','Blocked Users':'المستخدمون المحظورون','Total Withdrawals':'إجمالي السحب','Wheel Prizes':'جوائز العجلة','Refresh Statistics':'تحديث الإحصاءات','Save Settings':'حفظ الإعدادات','Restore Defaults':'استعادة الافتراضي','Wheel Management':'إدارة العجلة','Wheel Status':'حالة العجلة','Enabled':'مفعلة','Prizes':'الجوائز','Add Prize':'إضافة جائزة','Prize Name':'اسم الجائزة','Winning Weight':'وزن الفوز','Active':'نشط','Inactive':'غير نشط','Delete':'حذف','Save':'حفظ','Message & Image':'رسالة وصورة','Title':'العنوان','Message Text':'نص الرسالة','Image URL':'رابط الصورة','Preview':'معاينة','Save Message':'حفظ الرسالة','Saved Messages':'الرسائل المحفوظة','User Account Management':'إدارة حسابات المستخدمين','Search by Email':'البحث بالبريد الإلكتروني','Block':'حظر','Unblock':'إلغاء الحظر','Admin Security':'أمان الإدارة','Admin Username':'اسم مستخدم المدير','Admin Password':'كلمة مرور المدير','New Admin Password':'كلمة مرور جديدة','Change Admin Password':'تغيير كلمة المرور','Exit Admin Panel':'الخروج من لوحة الإدارة','Admin Login':'دخول المدير','Username':'اسم المستخدم','Contact Support':'التواصل مع الدعم','Important Notice':'إشعار مهم','Management Message':'رسالة الإدارة','None':'لا يوجد','Reset':'إعادة تعيين','Search':'بحث'
  };

  Object.assign(en,{"آینده مالی خود را با تصمیم‌های هوشمند بسازید":"Build your financial future with smart decisions","زمان باقی‌مانده تا محاسبه سود روزانه":"Time remaining until daily profit calculation","سود روزانه":"Daily Profit","روزانه":"Daily","زمان":"Time","قیمت":"Price","زمان باقی‌مانده":"Time Remaining","روز باقی‌مانده":"Days Remaining","روز":"Day","روزها":"Days","ساعت":"Hours","دقیقه":"Minutes","ثانیه":"Seconds","سرمایه‌گذاری ویژه":"Premium Investment","شروع سرمایه‌گذاری":"Start Investing","رشد سرمایه":"Investment Growth","سطح حرفه‌ای":"Professional Level","سطح سلطنتی":"Royal Level","جزئیات سطح سرمایه‌گذاری":"Investment Level Details","جزئیات":"Details","حداقل سرمایه":"Minimum Investment","مدت فعال بودن":"Active Duration","مدت دوره سوددهی":"Profit Cycle Duration","واریز برای این VIP":"Deposit for this VIP","افزایش سرمایه":"Increase Investment","مشاهده سطح فعال":"View Active Level","واریز برای بازکردن":"Deposit to Unlock","این سطح VIP هم‌اکنون برای شما فعال است":"This VIP level is currently active for you","این سطح قبلی قفل شده است؛ فقط بالاترین VIP کاربر فعال می‌ماند":"This previous level is locked; only the user’s highest VIP remains active","این VIP قفل است. برای فعال‌شدن به":"This VIP is locked. To activate it, you need","سرمایه بیشتر نیاز دارید":"more investment","دیگر نیاز دارید":"more needed","نیاز دارید":"needed","تبریک! بالاترین سطح VIP را دارید":"Congratulations! You have the highest VIP level","تبریک، بالاترین سطح VIP فعال است":"Congratulations, the highest VIP level is active","سطح مناسب برای شروع سرمایه‌گذاری":"A suitable level to start investing","سطح مناسب برای رشد سرمایه":"A suitable level for investment growth","سطح حرفه‌ای سرمایه‌گذاری":"Professional investment level","بالاترین سطح SHAYE":"The highest SHAYE level","مدیریت دارایی شخصی":"Personal Asset Management","وضعیت سرمایه‌گذاری":"Investment Status","کل سود":"Total Profit","تعداد واریز":"Deposit Count","هنوز واریزی ثبت نشده است":"No deposits have been recorded yet","مشاهده اعضای سه سطح و درآمد دعوت":"View three-level members and referral earnings","در حال آماده‌سازی":"Preparing","کد دعوت":"Referral Code","در حال دریافت اطلاعات تیم":"Loading team information","درصد پورسانت واریز":"Deposit Commission Rate","پورسانت پس از واریز تأییدشده مستقیماً به موجودی قابل برداشت معرف اضافه می‌شود":"Commission from a confirmed deposit is added directly to the referrer’s available balance","اطلاعات تیم بارگذاری نشد":"Team information could not be loaded","لطفاً یک‌بار از حساب خارج و دوباره وارد شوید":"Please log out and sign in again","خطایی هنگام بارگذاری صفحه تیم رخ داد":"An error occurred while loading the team page","هر روز یک وظیفه تصویری دریافت کنید و پس از تکمیل، سود VIP خود را بگیرید":"Receive one visual task each day and collect your VIP profit after completing it","وظایف در حال انجام":"Tasks in Progress","قوانین وظیفه":"Task Rules","وظیفه روزانه در بازه ساعت ۱۶ تا ساعت ۱۶ روز بعد قابل انجام است":"The daily task is available from 16:00 until 16:00 the next day","تنها بالاترین سطح VIP کاربر فعال می‌ماند و پاداش بر اساس همان سطح محاسبه می‌شود":"Only the user’s highest VIP level remains active and the reward is calculated from that level","پس از تکمیل، وظیفه به بخش «وظایف انجام‌شده» منتقل خواهد شد":"After completion, the task moves to Completed Tasks","تصاویر فعلی نمونه هستند و بعداً با عکس‌های اصلی شما جایگزین می‌شوند":"Current images are samples and can later be replaced with your own images","دوره VIP پایان یافته است":"The VIP period has ended","برای شروع دوره جدید، یک واریز تازه انجام دهید":"Make a new deposit to start a new period","همه VIPها قفل هستند":"All VIP levels are locked","پس از رسیدن مجموع واریز به حداقل VIP 1، وظیفه روزانه فعال می‌شود":"The daily task activates after total deposits reach the VIP 1 minimum","وظیفه این بازه انجام شده است":"The task for this period is completed","وظیفه بعدی رأس ساعت ۱۶ در همین بخش نمایش داده می‌شود":"The next task will appear here at 16:00","پاداش این VIP صفر است":"This VIP reward is zero","مدیر باید درصد سود روزانه این سطح را بررسی کند":"The administrator should check this level’s daily profit rate","تصویر وظیفه روزانه":"Daily Task Image","پایان فرصت":"Deadline","بعد از تکمیل اولین وظیفه، سابقه آن در این بخش نمایش داده می‌شود.":"After completing your first task, its record will appear here.","وظیفه انجام‌شده":"Completed Task","یا دوره سود شما فعال نیست.":"or your profit period is not active.","پاداش این وظیفه صفر است.":"This task reward is zero.","پاداش تکمیل وظیفه روزانه":"Daily task completion reward","مشاهده سودها، واریزها، برداشت‌ها و پورسانت‌های حساب":"View account profits, deposits, withdrawals and commissions","کل سود روزانه":"Total Daily Profit","کل پورسانت تیم":"Total Team Commission","کل واریز سرمایه":"Total Investment Deposits","کل برداشت":"Total Withdrawals","ثبت‌شده":"Recorded","تکمیل‌شده":"Completed","اگر از لینک دعوت وارد شده باشید، کد به‌صورت خودکار تکمیل می‌شود":"If you opened a referral link, the code is filled automatically","کد معرف":"Referral Code","در حال محاسبه وضعیت VIP":"Calculating VIP status","انتخاب‌شده":"Selected","سرمایه مورد نیاز":"Required Investment","مبلغ باقی‌مانده":"Remaining Amount","انتخاب یک VIP به‌معنی فعال‌شدن مستقیم آن نیست. سطح VIP همیشه بر اساس کل سرمایه تأییدشده حساب تعیین می‌شود":"Selecting a VIP does not activate it directly. VIP level is always determined by total confirmed investment.","فقط USDT شبکه BEP20 را به این آدرس ارسال کنید. ارسال دارایی یا شبکه دیگر ممکن است باعث از دست رفتن وجه شود":"Send only BEP20 USDT to this address. Using another asset or network may result in loss of funds.","در حال بررسی":"Checking","ثبت واریز آزمایشی":"Record Test Deposit","این بخش مخصوص نسخه محلی پروژه است. در نسخه نهایی، تراکنش پس از تأیید شبکه و سرور به‌صورت خودکار ثبت خواهد شد":"This section is for the local test version. In production, transactions will be recorded automatically after network and server confirmation.","وضعیت واریزها":"Deposit Status","۱- آدرس واریز بالا را کپی کنید":"1- Copy the deposit address above","۲- از کیف پول یا صرافی خود، USDT را فقط روی شبکه BEP20 ارسال کنید":"2- Send USDT only over BEP20 from your wallet or exchange","۳- پس از تأیید تراکنش، مبلغ به سرمایه غیرقابل برداشت شما اضافه می‌شود":"3- After confirmation, the amount is added to your non-withdrawable investment balance","۴- سیستم مجموع سرمایه را بررسی می‌کند و بالاترین VIP مجاز را خودکار فعال می‌کند":"4- The system checks total investment and automatically activates the highest eligible VIP","۵- مبلغ سرمایه با فعال‌شدن VIP کم نمی‌شود":"5- Activating VIP does not reduce your investment balance","خطا در خواندن کاربران":"Error reading users","آدرس واریز در حال حاضر تنظیم نشده است":"The deposit address is not configured","بالاترین سطح VIP برای حساب شما فعال است":"The highest VIP level is active for your account","شرایط این سطح را دارید":"You qualify for this level","آدرس کیف پول هنوز ایجاد نشده است":"The wallet address has not been created yet","به‌عنوان تراکنش تأییدشده ثبت شود؟":"be recorded as a confirmed transaction?","به‌صورت خودکار فعال شد":"was activated automatically","برای فعال‌شدن":"To activate","هنوز":"Still","مبلغ قابل برداشت":"Withdrawable Amount","مبلغ باید کمتر یا مساوی موجودی قابل برداشت باشد":"The amount must be less than or equal to your available balance","آدرس BEP20 معمولاً با 0x شروع می‌شود و 42 کاراکتر دارد":"A BEP20 address usually starts with 0x and contains 42 characters","همان رمز ورود به حساب":"Use your account login password","این نسخه هنوز آزمایشی و بدون سرور است؛ بنابراین «برداشت مستقیم» در این مرحله":"This version is still a serverless test; therefore “direct withdrawal” at this stage","به معنی ثبت تراکنش و کم‌شدن مبلغ در حافظه همین مرورگر است و انتقال واقعی USDT":"means recording the transaction and reducing the amount only in this browser; real USDT transfer","روی بلاکچین انجام نمی‌شود":"is not performed on the blockchain","در حال ثبت...":"Submitting...","حساب کاربری پیدا نشد. دوباره وارد شوید.":"Account not found. Please sign in again.","آدرس کیف پول BEP20 معتبر نیست. آدرس باید با 0x شروع شود و 42 کاراکتر داشته باشد":"Invalid BEP20 address. It must start with 0x and contain 42 characters","گذرواژه برداشت را وارد کنید.":"Enter the withdrawal password.","ثبت برداشت با خطا روبه‌رو شد. دوباره تلاش کنید":"Withdrawal submission failed. Please try again.","آمار کلی":"Overview","و سود":"and Profit","مدیریت حساب‌ها":"Account Management","امنیت":"Security","تنظیمات عمومی گردونه":"General Wheel Settings","متن توضیح داخل گردونه":"Wheel Description Text","جایزه فعال با وزن صفر داخل گردونه دیده می‌شود اما برنده نخواهد شد":"An active prize with zero weight remains visible but cannot win","پیش‌فرض گردونه":"Wheel Defaults","مدیریت فرصت کاربران":"Manage User Spins","حداکثر رکورد":"Maximum Records","این پیام بعد از ورود یا ثبت‌نام و هر بار بازگشت کاربر به صفحه خانه نمایش داده می‌شود. ضربدر فقط همان نمایش را می‌بندد":"This message appears after login or registration and every time the user returns to Home. The close button only closes the current display.","متن پشتیبانی یا اطلاعیه":"Support text or announcement","این نسخه با LocalStorage کار می‌کند و برای آزمایش مناسب است. برای انتشار واقعی، ورود مدیر، موجودی‌ها، جایزه‌ها و تاریخچه باید روی بک‌اند امن ذخیره شوند":"This version uses LocalStorage and is suitable for testing. For production, admin login, balances, prizes and history must be stored on a secure backend.","زیرنویس":"Subtitle","استفاده‌شده":"Used","کاربری پیدا نشد.":"No user found.","رکوردی وجود ندارد":"No records available","غیرفعال‌کردن":"Disable","فعال‌کردن":"Enable","مسدودکردن":"Block","رفع مسدودی":"Unblock","جایزه جدید":"New Prize","هر فرصت فقط یک بار قابل استفاده است":"Each spin can be used only once","جایزه‌های فعال با وزن صفر روی گردونه نمایش داده می‌شوند":"Active prizes with zero weight are shown on the wheel","اما در انتخاب برنده شرکت نمی‌کنند":"but are excluded from winner selection","برای چرخاندن گردونه، حداقل یک جایزه فعال باید درصدی بیشتر از صفر داشته باشد":"To spin the wheel, at least one active prize must have a weight greater than zero","کاربر عزیز، فرصت گردونه از ثبت‌نام و فعال‌سازی VIP دعوت مستقیم دریافت می‌شود":"Dear user, wheel spins are earned from registration and direct-referral VIP activation","باز کردن گردونه جایزه":"Open Prize Wheel","پیام مدیریت":"Management Message","فرصت":"Spin","فرصت‌ها":"Spins","باقی‌مانده":"Remaining","مجموع":"Total","فعلی":"Current","فعال است":"is active","قفل":"Locked","سطح قبلی":"Previous Level"});
  Object.assign(ru,{"Build your financial future with smart decisions":"Стройте финансовое будущее с умными решениями","Time remaining until daily profit calculation":"До расчёта ежедневной прибыли","Daily Profit":"Ежедневная прибыль","Time Remaining":"Осталось времени","Day":"День","Days":"Дни","Hours":"Часы","Minutes":"Минуты","Seconds":"Секунды","Price":"Цена","Details":"Подробнее","Minimum Investment":"Минимальная инвестиция","Active Duration":"Срок действия","Investment Status":"Статус инвестиций","Total Profit":"Общая прибыль","Deposit Count":"Количество пополнений","Remaining Amount":"Оставшаяся сумма","Required Investment":"Требуемая инвестиция","Selected":"Выбрано","Checking":"Проверка","Deadline":"Срок","Task Rules":"Правила задания","Tasks in Progress":"Текущие задания","Total Daily Profit":"Общая ежедневная прибыль","Total Team Commission":"Общая комиссия команды","Total Investment Deposits":"Все пополнения","Recorded":"Записано","Personal Asset Management":"Управление активами","Withdrawable Amount":"Доступно для вывода","Overview":"Обзор","Security":"Безопасность","Subtitle":"Подзаголовок","Used":"Использовано","No user found.":"Пользователь не найден","No records available":"Нет записей","Enable":"Включить","Disable":"Отключить","New Prize":"Новый приз","Spin":"Попытка","Spins":"Попытки","Remaining":"Осталось","Current":"Текущий","Locked":"Заблокировано"});
  Object.assign(ar,{"Build your financial future with smart decisions":"ابنِ مستقبلك المالي بقرارات ذكية","Time remaining until daily profit calculation":"الوقت المتبقي لحساب الربح اليومي","Daily Profit":"الربح اليومي","Time Remaining":"الوقت المتبقي","Day":"يوم","Days":"أيام","Hours":"ساعات","Minutes":"دقائق","Seconds":"ثوانٍ","Price":"السعر","Details":"التفاصيل","Minimum Investment":"الحد الأدنى للاستثمار","Active Duration":"مدة التفعيل","Investment Status":"حالة الاستثمار","Total Profit":"إجمالي الربح","Deposit Count":"عدد الإيداعات","Remaining Amount":"المبلغ المتبقي","Required Investment":"الاستثمار المطلوب","Selected":"محدد","Checking":"جارٍ التحقق","Deadline":"نهاية المهلة","Task Rules":"قواعد المهمة","Tasks in Progress":"المهام الجارية","Total Daily Profit":"إجمالي الربح اليومي","Total Team Commission":"إجمالي عمولة الفريق","Total Investment Deposits":"إجمالي إيداعات الاستثمار","Recorded":"مسجل","Personal Asset Management":"إدارة الأصول الشخصية","Withdrawable Amount":"المبلغ القابل للسحب","Overview":"نظرة عامة","Security":"الأمان","Subtitle":"العنوان الفرعي","Used":"مستخدم","No user found.":"لم يتم العثور على مستخدم","No records available":"لا توجد سجلات","Enable":"تفعيل","Disable":"تعطيل","New Prize":"جائزة جديدة","Spin":"فرصة","Spins":"فرص","Remaining":"متبقٍ","Current":"الحالي","Locked":"مقفل"});
  function normalize(s){return String(s||'').replace(/\s+/g,' ').trim();}
  function replaceAllMap(text,map){
    var out=String(text);
    Object.keys(map).sort(function(a,b){return b.length-a.length;}).forEach(function(key){
      if(key && out.indexOf(key)!==-1) out=out.split(key).join(map[key]);
    });
    return out;
  }
  function translateFaTo(lang, text){
    var raw=String(text==null?'':text), n=normalize(raw);
    if(!n||lang==='fa') return raw;
    var exact=en[n];
    var base=exact||replaceAllMap(n,en);
    if(lang==='en') return base===n?raw:base;
    var target=lang==='ru'?ru:ar;
    var translated=target[base]||replaceAllMap(base,target);
    return translated===n?raw:translated;
  }

  var textOriginals=new WeakMap();
  var attrOriginals=new WeakMap();
  var current='en';
  var observer=null;
  var applying=false;
  var scheduled=false;

  function getAttrStore(el){
    var store=attrOriginals.get(el);
    if(!store){store={};attrOriginals.set(el,store);}
    return store;
  }

  function translateTextNode(node,lang,refreshOriginal){
    if(!node||node.nodeType!==3) return;
    if(refreshOriginal || !textOriginals.has(node)) textOriginals.set(node,node.nodeValue);
    var original=textOriginals.get(node);
    var trimmed=normalize(original);
    if(!trimmed) return;
    var translated=translateFaTo(lang,trimmed);
    if(translated===trimmed){node.nodeValue=original;return;}
    var lead=(original.match(/^\s*/)||[''])[0];
    var trail=(original.match(/\s*$/)||[''])[0];
    node.nodeValue=lead+translated+trail;
  }

  function translateElement(el,lang){
    if(!el||el.nodeType!==1) return;
    var store=getAttrStore(el);
    ['placeholder','title','aria-label','value'].forEach(function(attr){
      if(!el.hasAttribute(attr)) return;
      if(attr==='value' && !/^(button|submit|reset)$/i.test(el.type||'')) return;
      if(store[attr]===undefined) store[attr]=el.getAttribute(attr);
      el.setAttribute(attr,translateFaTo(lang,store[attr]));
    });
  }

  function shouldSkip(el){
    return !!(el && el.nodeType===1 && (
      el.tagName==='SCRIPT'||el.tagName==='STYLE'||el.tagName==='NOSCRIPT'||
      el.closest('.shaye-language-switcher')||el.hasAttribute('data-no-i18n')
    ));
  }

  function walk(root,lang){
    if(!root) return;
    if(root.nodeType===3){translateTextNode(root,lang);return;}
    if(root.nodeType!==1 && root.nodeType!==9 && root.nodeType!==11) return;
    if(root.nodeType===1 && shouldSkip(root)) return;
    if(root.nodeType===1) translateElement(root,lang);
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
    var node;
    while((node=walker.nextNode())){
      if(node.nodeType===1){
        if(shouldSkip(node)) continue;
        translateElement(node,lang);
      }else if(node.parentElement && !shouldSkip(node.parentElement)){
        translateTextNode(node,lang);
      }
    }
  }

  function buildSwitcher(){
    if(document.querySelector('.shaye-language-switcher')) return;
    var wrap=document.createElement('div');
    wrap.className='shaye-language-switcher';
    wrap.setAttribute('data-no-i18n','true');
    wrap.innerHTML='<button class="shaye-language-button" type="button" aria-label="Change language">🌐</button><div class="shaye-language-menu"></div>';
    var menu=wrap.querySelector('.shaye-language-menu');
    supported.forEach(function(code){
      var b=document.createElement('button');
      b.type='button';b.className='shaye-language-option';b.dataset.lang=code;
      b.innerHTML='<span>'+meta[code].flag+'</span><span>'+meta[code].name+'</span><span class="shaye-language-code">'+code+'</span>';
      menu.appendChild(b);
    });
    document.body.appendChild(wrap);
    wrap.querySelector('.shaye-language-button').addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();wrap.classList.toggle('open');
    });
    menu.addEventListener('click',function(e){
      var b=e.target.closest('[data-lang]');if(!b)return;
      e.preventDefault();e.stopPropagation();setLanguage(b.dataset.lang);wrap.classList.remove('open');
    });
    document.addEventListener('click',function(e){if(!wrap.contains(e.target))wrap.classList.remove('open');});
  }

  function observe(){
    if(observer) observer.disconnect();
    observer=new MutationObserver(function(ms){
      if(applying||scheduled) return;
      var relevant=ms.some(function(m){return (m.type==='childList'&&m.addedNodes&&m.addedNodes.length)||m.type==='characterData';});
      if(!relevant) return;
      scheduled=true;
      requestAnimationFrame(function(){
        scheduled=false;
        if(applying) return;
        applying=true;
        observer.disconnect();
        ms.forEach(function(m){
          if(m.type==='childList') m.addedNodes.forEach(function(n){walk(n,current);});
          else if(m.type==='characterData' && m.target && m.target.parentElement && !shouldSkip(m.target.parentElement)) translateTextNode(m.target,current,true);
        });
        applying=false;
        observe();
      });
    });
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  }

  function setLanguage(lang){
    if(supported.indexOf(lang)<0) lang='en';
    current=lang;
    try{localStorage.setItem(KEY,lang);}catch(e){}
    document.documentElement.lang=lang;
    document.documentElement.dir=meta[lang].dir;
    if(!document.documentElement.dataset.originalTitle) document.documentElement.dataset.originalTitle=document.title;
    document.title=translateFaTo(lang,document.documentElement.dataset.originalTitle);
    applying=true;
    if(observer) observer.disconnect();
    walk(document.body,lang);
    applying=false;
    document.querySelectorAll('.shaye-language-option').forEach(function(b){
      b.classList.toggle('active',b.dataset.lang===lang);
    });
    observe();
    try{window.dispatchEvent(new CustomEvent('shaye:languagechange',{detail:{language:lang}}));}catch(e){}
  }

  function init(){
    buildSwitcher();
    var saved='en';
    try{saved=localStorage.getItem(KEY)||'en';}catch(e){}
    setLanguage(saved);
  }

  window.ShayeI18n={
    setLanguage:setLanguage,
    getLanguage:function(){return current;},
    translate:function(s){return translateFaTo(current,s);}
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
