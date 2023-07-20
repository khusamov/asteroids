Работа со шрифтами типа BDF
===========================

Утилиты для работы со шрифтами Bitmap Distribution Format (BDF):  
https://ru.wikipedia.org/wiki/Bitmap_Distribution_Format  

Используется парсер  
https://font.tomchen.org/bdfparser_js  
Вполне свежий. Поддерживается TypeScript.  
Его репо: https://github.com/tomchen/bdfparser-js  
Документация: https://font.tomchen.org/  

Для загрузки файла шрифта используется особая версия fetch-функции:  
https://github.com/tomchen/fetchline#fetchline-nodefetchline-isomorphic-fetchline-and-naivefetchline  

Для поддержки старых кодировок используется  
https://www.npmjs.com/package/iconv-lite

Готовые файлы со шрифтами на русском языке  
https://gitlab.freedesktop.org/xorg/font/misc-cyrillic/-/tree/master  
http://www.kovrik.com/sib/russify/x-windows/  

Supported Encodings
-------------------
https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings

- Node.js Native encodings: utf8, cesu8, ucs2 / utf16le, ascii, binary, base64, hex
- Unicode: UTF7, UTF7-IMAP, UTF-16BE, UTF-16 (with BOM), UCS-4/UTF-32 (with BOM), UTF-32LE, UTF-32BE

### Single-byte:
- Windows codepages: 874, 1250-1258 (aliases: cpXXX, winXXX, windowsXXX)
- ISO codepages: ISO-8859-1 - ISO-8859-16
- IBM codepages: 437, 720, 737, 775, 808, 850, 852, 855-858, 860-866, 869, 922, 1046, 1124, 1125, 1129, 1133, 1161-1163 (aliases cpXXX, ibmXXX)
- Mac codepages: maccroatian, maccyrillic, macgreek, maciceland, macroman, macromania, macthai, macturkish, macukraine, maccenteuro, macintosh
- KOI8 codepages: koi8-r, koi8-u, koi8-ru, koi8-t
- Miscellaneous: armscii8, rk1048, tcvn, georgianacademy, georgianps, pt154, viscii, iso646cn, iso646jp, hproman8, tis620

### Multi-byte:
- Japanese: Shift_JIS, Windows-31j, Windows932, EUC-JP
- Chinese: GB2312, GBK, GB18030, Windows936, EUC-CN
- Korean: KS_C_5601, Windows949, EUC-KR
- Taiwan/Hong Kong: Big5, Big5-HKSCS, Windows950

Еще парсеры есть?
-----------------

Есть еще парсеры, но там есть проблемы  
https://www.npmjs.com/package/bdf  
https://www.npmjs.com/package/bdf-canvas  
https://github.com/cho45/bdfcanvas  
https://cho45.stfuawsc.com/bdfcanvas/canvas-bdf.  