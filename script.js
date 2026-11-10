/**
 * Hệ Thống Mẫu In Hồ Sơ Bệnh Án - BVĐK Sa Đéc
 * Tệp điều khiển logic JavaScript độc lập (script.js)
 * Tác giả: Quoc IT
 */

// =========================================================
// 1. KHỞI TẠO NĂM & NGÀY GIỜ HIỆN TẠI KHI MỞ TRANG
// =========================================================
const now = new Date();

// Tự động điền năm hiện tại cho Form Bìa
const inputNam = document.getElementById('input-nam');
if (inputNam) inputNam.value = now.getFullYear();

// Tự động điền ngày giờ vào Form Cam Kết
if (document.getElementById('ck-gio')) {
    document.getElementById('ck-gio').value = String(now.getHours()).padStart(2, '0');
    document.getElementById('ck-phut').value = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('ck-ngay').value = String(now.getDate()).padStart(2, '0');
    document.getElementById('ck-thang').value = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('ck-nam').value = now.getFullYear();

    document.getElementById('ck-doc-ngay').value = String(now.getDate()).padStart(2, '0');
    document.getElementById('ck-doc-thang').value = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('ck-doc-nam').value = now.getFullYear();
}

// Tự động điền ngày cho Form Phiếu tạm ứng
if (document.getElementById('tu-ngay')) {
    document.getElementById('tu-ngay').value = String(now.getDate()).padStart(2, '0');
    document.getElementById('tu-thang').value = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('tu-nam').value = now.getFullYear();
}
if (document.getElementById('tu-ngay-2')) {
    document.getElementById('tu-ngay-2').value = String(now.getDate()).padStart(2, '0');
    document.getElementById('tu-thang-2').value = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('tu-nam-2').value = now.getFullYear();
}

// Tự động điền ngày giờ cho Form Phiếu Thu Tiền Tạm Ứng
if (document.getElementById('pth-gio')) {
    document.getElementById('pth-gio').value = String(now.getHours()).padStart(2, '0');
    document.getElementById('pth-phut').value = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('pth-ngay').value = String(now.getDate()).padStart(2, '0');
    document.getElementById('pth-thang').value = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('pth-nam').value = now.getFullYear();
    // pth-quyen để trống hoàn toàn để người dùng tự do nhập
}

// Tự động điền ngày cho Form Ra viện trái chỉ định
if (document.getElementById('rv-doc-ngay')) {
    document.getElementById('rv-doc-ngay').value = String(now.getDate()).padStart(2, '0');
    document.getElementById('rv-doc-thang').value = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('rv-doc-nam').value = now.getFullYear();

    document.getElementById('rv-nb-ngay').value = String(now.getDate()).padStart(2, '0');
    document.getElementById('rv-nb-thang').value = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('rv-nb-nam').value = now.getFullYear();
}


// =========================================================
// 2. ĐỒNG BỘ CHỮ KÝ VÀ CO GIÃN TEXTAREA
// =========================================================

// Tự động đồng bộ Tên người ký xuống dòng chữ ký bên dưới (Form 2 - Cam kết từ chối KCB)
function syncSignerName(val) {
    const sigInput = document.getElementById('ck-ten-nguoi-benh');
    if (sigInput) {
        sigInput.value = val;
    }
}

// Tự động đồng bộ Tên người ký xuống dòng chữ ký bên dưới (Form 3 - Chuyển viện)
function syncChuyenVienSigner(val) {
    const sigInput = document.getElementById('cv-ten-nguoi-ky');
    if (sigInput) {
        sigInput.value = val;
    }
}

// Tự động đồng bộ Tên người ký xuống dòng chữ ký bên dưới (Form 4 - Ra viện trái chỉ định)
function syncRaVienSigner(val) {
    const sigInput = document.getElementById('rv-ten-nguoi-ky');
    if (sigInput) {
        sigInput.value = val;
    }
}

// Tự động co giãn chiều cao của Textarea theo nội dung nhập
function autoResizeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}


// Biến theo dõi form hiện tại
let currentActiveForm = 'bia';

// =========================================================
// 3. ĐIỀU HƯỚNG CHUYỂN ĐỔI BIỂU MẪU (SIDEBAR & HEADER)
// =========================================================
function switchForm(formName) {
    currentActiveForm = formName;
    const navBia = document.getElementById('nav-bia');
    const navCamKet = document.getElementById('nav-camket');
    const navChuyenVien = document.getElementById('nav-chuyenvien');
    const navRaVien = document.getElementById('nav-ravien');
    const navTamUng = document.getElementById('nav-tamung');
    const navPhieuThu = document.getElementById('nav-phieuthu');

    const formBia = document.getElementById('form-bia');
    const formCamKet = document.getElementById('form-camket');
    const formChuyenVien = document.getElementById('form-chuyenvien');
    const formRaVien = document.getElementById('form-ravien');
    const formTamUng = document.getElementById('form-tamung');
    const formPhieuThu = document.getElementById('form-phieuthu');

    const tuOptions = document.getElementById('tamung-options-panel');
    const pthOptions = document.getElementById('phieuthu-options-panel');
    const breadcrumbEl = document.getElementById('current-form-breadcrumb');

    // Reset tất cả các nút & ẩn các form
    if (navBia) navBia.classList.remove('active');
    if (navCamKet) navCamKet.classList.remove('active');
    if (navChuyenVien) navChuyenVien.classList.remove('active');
    if (navRaVien) navRaVien.classList.remove('active');
    if (navTamUng) navTamUng.classList.remove('active');
    if (navPhieuThu) navPhieuThu.classList.remove('active');

    if (formBia) formBia.style.display = 'none';
    if (formCamKet) formCamKet.style.display = 'none';
    if (formChuyenVien) formChuyenVien.style.display = 'none';
    if (formRaVien) formRaVien.style.display = 'none';
    if (formTamUng) formTamUng.style.display = 'none';
    if (formPhieuThu) formPhieuThu.style.display = 'none';

    if (tuOptions) tuOptions.style.display = 'none';
    if (pthOptions) pthOptions.style.display = 'none';

    if (formName === 'bia') {
        if (navBia) navBia.classList.add('active');
        if (formBia) formBia.style.display = 'block';
        if (breadcrumbEl) breadcrumbEl.innerText = 'Tạo Bìa Bệnh Án';
    } else if (formName === 'camket') {
        if (navCamKet) navCamKet.classList.add('active');
        if (formCamKet) formCamKet.style.display = 'block';
        if (breadcrumbEl) breadcrumbEl.innerText = 'Giấy Cam Kết Từ Chối KCB';
    } else if (formName === 'chuyenvien') {
        if (navChuyenVien) navChuyenVien.classList.add('active');
        if (formChuyenVien) formChuyenVien.style.display = 'block';
        if (breadcrumbEl) breadcrumbEl.innerText = 'Giấy Cam Kết Chuyển Viện';
    } else if (formName === 'ravien') {
        if (navRaVien) navRaVien.classList.add('active');
        if (formRaVien) formRaVien.style.display = 'block';
        if (breadcrumbEl) breadcrumbEl.innerText = 'Cam Kết Ra Viện Trái Chỉ Định';
    } else if (formName === 'tamung') {
        if (navTamUng) navTamUng.classList.add('active');
        if (formTamUng) formTamUng.style.display = 'block';
        if (breadcrumbEl) breadcrumbEl.innerText = 'Phiếu Đề Nghị Tạm Ứng';
        if (tuOptions) tuOptions.style.display = 'block';
        setTimeout(function () {
            updateTuBarcode();
        }, 50);
    } else if (formName === 'phieuthu') {
        if (navPhieuThu) navPhieuThu.classList.add('active');
        if (formPhieuThu) formPhieuThu.style.display = 'block';
        if (breadcrumbEl) breadcrumbEl.innerText = 'Phiếu Thu Tiền Tạm Ứng';
        if (pthOptions) pthOptions.style.display = 'block';
        setTimeout(function () {
            updatePthBarcode();
        }, 50);
    }
}


// =========================================================
// 4. HỆ THỐNG SINH MÃ VẠCH (BARCODE 128)
// =========================================================

// Cập nhật Barcode động khi nhập Mã bệnh án (Form Bìa)
function updateBarcode() {
    const el = document.getElementById('input-ma-ba');
    const val = el ? el.value.trim() : '';
    const barcodeEl = document.getElementById('barcode');
    if (val && typeof JsBarcode === 'function' && barcodeEl) {
        try {
            JsBarcode("#barcode", val, {
                format: "CODE128",
                width: 1.4,
                height: 25,
                displayValue: false
            });
            barcodeEl.style.display = "block";
        } catch (e) {
            console.error("Barcode generation error:", e);
            barcodeEl.style.display = "none";
        }
    } else if (barcodeEl) {
        barcodeEl.style.display = "none";
    }
}

// Cập nhật Barcode động cho Phiếu Đề Nghị Tạm Ứng
function updateTuBarcode(val) {
    if (val === undefined || typeof val !== 'string') {
        const input = document.getElementById('tu-ma-ba-input');
        val = input ? input.value : '';
    }
    val = (val || '').trim();

    const barcode1 = document.getElementById('tu-barcode');
    const barcode2 = document.getElementById('tu-barcode-2');

    if (!val) {
        if (barcode1) barcode1.style.display = "none";
        if (barcode2) barcode2.style.display = "none";
        return;
    }

    if (typeof JsBarcode === 'function') {
        if (barcode1) {
            try {
                JsBarcode("#tu-barcode", val, {
                    format: "CODE128",
                    width: 1.45,
                    height: 38,
                    displayValue: true,
                    font: "Times New Roman",
                    fontSize: 12,
                    textMargin: 2,
                    margin: 0
                });
                barcode1.style.display = "block";
            } catch (e) {
                console.error("Barcode 1 error:", e);
                barcode1.style.display = "none";
            }
        }

        if (barcode2) {
            try {
                JsBarcode("#tu-barcode-2", val, {
                    format: "CODE128",
                    width: 1.45,
                    height: 38,
                    displayValue: true,
                    font: "Times New Roman",
                    fontSize: 12,
                    textMargin: 2,
                    margin: 0
                });
                barcode2.style.display = "block";
            } catch (e) {
                console.error("Barcode 2 error:", e);
                barcode2.style.display = "none";
            }
        }
    }
}

// Cập nhật Barcode động cho Phiếu Thu Tiền Tạm Ứng (Mã BA)
function updatePthBarcode(val) {
    if (val === undefined || typeof val !== 'string') {
        const input = document.getElementById('pth-ma-ba-input');
        val = input ? input.value : '';
    }
    val = (val || '').trim();

    const barcode1 = document.getElementById('pth-barcode');

    if (!val) {
        if (barcode1) barcode1.style.display = "none";
        return;
    }

    if (typeof JsBarcode === 'function') {
        if (barcode1) {
            try {
                JsBarcode("#pth-barcode", val, {
                    format: "CODE128",
                    width: 1.25,
                    height: 26,
                    displayValue: false,
                    margin: 0
                });
                barcode1.style.display = "block";
            } catch (e) {
                console.error("PTH Barcode error:", e);
                barcode1.style.display = "none";
            }
        }
    }
}


// =========================================================
// 5. TIỆN ÍCH HỖ TRỢ NHẬP LIỆU NHANH
// =========================================================

// Tự động co giãn kích thước chữ tên Khoa nếu tên dài để không bị khuất chữ
function updateKhoaFontSize(input) {
    if (!input) return;
    const len = (input.value || '').length;
    if (len > 32) {
        input.style.fontSize = '9pt';
    } else if (len > 24) {
        input.style.fontSize = '10pt';
    } else if (len > 18) {
        input.style.fontSize = '11pt';
    } else {
        input.style.fontSize = '11.5pt';
    }
}

// Điền nhanh tên Khoa khi chọn từ danh sách Dropdown (Form Bìa & Cam Kết)
function applyKhoa(selectEl, targetId) {
    if (selectEl && selectEl.value) {
        const target = document.getElementById(targetId);
        if (target) {
            target.value = selectEl.value;
            autoResizeTextarea(target);
        }
        selectEl.value = "";
    }
}

// Điền nhanh tên Khoa cho Phiếu Tạm Ứng
function applyTuKhoa(selectEl) {
    if (selectEl && selectEl.value) {
        const k1 = document.getElementById('tu-khoa');
        const k2 = document.getElementById('tu-khoa-2');
        if (k1) {
            k1.value = selectEl.value;
            updateKhoaFontSize(k1);
        }
        if (k2) {
            k2.value = selectEl.value;
            updateKhoaFontSize(k2);
        }
        selectEl.value = "";
    }
}

// Chọn nhanh đối tượng cho Phiếu Tạm Ứng
function applyTuDoiTuong(val) {
    const dt1 = document.getElementById('tu-doi-tuong');
    const dt2 = document.getElementById('tu-doi-tuong-2');
    if (dt1) dt1.value = val;
    if (dt2) dt2.value = val;
}

// Chọn nhanh Khoa cho Phiếu Thu
function applyPthKhoa(selectEl) {
    if (selectEl && selectEl.value) {
        const k1 = document.getElementById('pth-khoa');
        if (k1) k1.value = selectEl.value;
        selectEl.value = "";
    }
}

// Điền nhanh Khoa vào ô bất kỳ (Input hoặc Textarea)
function applyKhoaToInput(selectEl, targetId) {
    if (selectEl && selectEl.value) {
        const target = document.getElementById(targetId);
        if (target) {
            target.value = selectEl.value;
            if (target.tagName.toLowerCase() === 'textarea') {
                autoResizeTextarea(target);
            }
        }
        selectEl.value = "";
    }
}

// Định dạng tiền tệ cho Phiếu Tạm Ứng (VD: 1,000 hoặc 500,000)
function formatTuMoney(input) {
    if (!input) return;
    let clean = input.value.replace(/[^0-9]/g, '');
    if (!clean) {
        input.value = '';
        return;
    }
    input.value = Number(clean).toLocaleString('en-US');
}

// Chọn nhanh số tiền cho Phiếu Đề Nghị Tạm Ứng
function quickSetTuMoney(amount) {
    const el = document.getElementById('tu-so-tien');
    if (el) {
        el.value = Number(amount).toLocaleString('en-US');
        syncTuCopies();
    }
}

// Hàm đọc số tiền ra chữ tiếng Việt chuẩn xác
function docSoTienTiengViet(soTien) {
    if (!soTien || isNaN(soTien)) return '';
    soTien = Math.round(Number(soTien));
    if (soTien === 0) return 'Không đồng';

    const chuSo = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const donVi = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

    function docBlock3(b, coHangTruoc) {
        let tram = Math.floor(b / 100);
        let chuc = Math.floor((b % 100) / 10);
        let donvi = b % 10;
        let res = '';

        if (tram > 0 || coHangTruoc) {
            res += chuSo[tram] + ' trăm ';
        }

        if (chuc > 1) {
            res += chuSo[chuc] + ' mươi ';
            if (donvi === 1) res += 'mốt ';
            else if (donvi === 5) res += 'lăm ';
            else if (donvi > 0) res += chuSo[donvi] + ' ';
        } else if (chuc === 1) {
            res += 'mười ';
            if (donvi === 5) res += 'lăm ';
            else if (donvi > 0) res += chuSo[donvi] + ' ';
        } else if (chuc === 0 && (tram > 0 || coHangTruoc) && donvi > 0) {
            res += 'lẻ ' + chuSo[donvi] + ' ';
        } else if (donvi > 0 && !coHangTruoc && tram === 0 && chuc === 0) {
            res += chuSo[donvi] + ' ';
        }
        return res.trim();
    }

    let str = '';
    let blocks = [];
    let temp = soTien;
    while (temp > 0) {
        blocks.push(temp % 1000);
        temp = Math.floor(temp / 1000);
    }

    for (let i = blocks.length - 1; i >= 0; i--) {
        let b = blocks[i];
        if (b > 0) {
            let coHangTruoc = (i < blocks.length - 1);
            let bStr = docBlock3(b, coHangTruoc);
            str += bStr + ' ' + donVi[i] + ' ';
        }
    }

    str = str.trim();
    if (!str) return '';
    str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    str = str.replace(/\s+/g, ' ') + ' đồng';
    return str;
}

// Định dạng tiền tệ cho Phiếu Thu và tự động dịch thành chữ
function handlePthMoneyChange(input) {
    if (!input) return;
    let raw = input.value.replace(/[^0-9]/g, '');
    const bangChuEl = document.getElementById('pth-bang-chu');
    if (!raw) {
        input.value = '';
        if (bangChuEl) bangChuEl.value = '';
        return;
    }
    input.value = Number(raw).toLocaleString('vi-VN');
    const doc = docSoTienTiengViet(Number(raw));
    if (bangChuEl) {
        bangChuEl.value = doc;
    }
}

// Chọn nhanh số tiền từ danh sách mẫu (Phiếu Thu)
function quickSetPthMoney(amount) {
    const el = document.getElementById('pth-so-tien');
    if (el) {
        el.value = Number(amount).toLocaleString('vi-VN');
        handlePthMoneyChange(el);
    }
}

// Tự động gợi ý lý do tạm ứng khi gõ Mã viện phí (Phiếu Thu)
function autoFillPthLyDo() {
    const maVp = (document.getElementById('pth-ma-vp').value || '').trim();
    const lyDoEl = document.getElementById('pth-ly-do');
    if (maVp && lyDoEl && (!lyDoEl.value || lyDoEl.value.startsWith('Tạm ứng cho viện phí '))) {
        lyDoEl.value = `Tạm ứng cho viện phí ${maVp} - lần 1`;
    }
}


// =========================================================
// 6. XỬ LÝ LỊCH VÀ ĐỒNG BỘ LIÊN 2 (PHIẾU ĐỀ NGHỊ TẠM ỨNG)
// =========================================================

// Mở bộ chọn ngày native calendar
function openDatePicker(pickerId) {
    const picker = document.getElementById(pickerId);
    if (picker) {
        if (typeof picker.showPicker === 'function') {
            picker.showPicker();
        } else {
            picker.click();
        }
    }
}

// Định dạng ngày chọn từ Lịch thành dd/mm/yyyy
function applyDate(datePicker, targetId) {
    if (!datePicker || !datePicker.value) return;
    const parts = datePicker.value.split('-'); // Format YYYY-MM-DD
    if (parts.length === 3) {
        const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        const target = document.getElementById(targetId);
        if (target) target.value = formattedDate;
    }
}

// Định dạng ngày chọn cho Phiếu Tạm Ứng
function applyTuDate(picker) {
    if (!picker || !picker.value) return;
    const parts = picker.value.split('-'); // YYYY-MM-DD
    if (parts.length === 3) {
        const y = document.getElementById('tu-nam');
        const m = document.getElementById('tu-thang');
        const d = document.getElementById('tu-ngay');
        if (y) y.value = parts[0];
        if (m) m.value = String(parseInt(parts[1], 10));
        if (d) d.value = String(parseInt(parts[2], 10));
        syncTuCopies();
    }
}

// Định dạng ngày chọn cho Phiếu Thu
function applyPthDate(picker) {
    if (!picker || !picker.value) return;
    const parts = picker.value.split('-'); // YYYY-MM-DD
    if (parts.length === 3) {
        const y = document.getElementById('pth-nam');
        const m = document.getElementById('pth-thang');
        const d = document.getElementById('pth-ngay');
        if (y) y.value = parts[0];
        if (m) m.value = String(parseInt(parts[1], 10));
        if (d) d.value = String(parseInt(parts[2], 10));
    }
}

// Đồng bộ dữ liệu từ Liên 1 sang Liên 2 khi in 2 bản trên 1 tờ A4 (Phiếu Tạm Ứng)
function syncTuCopies() {
    const fields = [
        'tu-khoa', 'tu-so-phieu', 'tu-ho-ten', 'tu-tuoi',
        'tu-gioi-tinh', 'tu-ma-bn', 'tu-so-vao-vien',
        'tu-doi-tuong', 'tu-dia-chi', 'tu-so-tien', 'tu-noi-dung',
        'tu-ngay', 'tu-thang', 'tu-nam', 'tu-nguoi-lap'
    ];
    fields.forEach(f => {
        const el1 = document.getElementById(f);
        const el2 = document.getElementById(f + '-2');
        if (el1 && el2) {
            el2.value = el1.value;
        }
    });

    const k1 = document.getElementById('tu-khoa');
    const k2 = document.getElementById('tu-khoa-2');
    if (k1) updateKhoaFontSize(k1);
    if (k2) updateKhoaFontSize(k2);

    const maba1 = document.getElementById('tu-ma-ba-input');
    const maba2 = document.getElementById('tu-ma-ba-input-2');
    if (maba1 && maba2) {
        maba2.value = maba1.value;
    }
    if (maba1) {
        updateTuBarcode(maba1.value);
    }
}

// Chuyển chế độ in 1 bản A5 hoặc 2 bản trên tờ A4 (Phiếu Tạm Ứng)
function toggleTuPrintMode(mode) {
    const copy2 = document.getElementById('tu-second-copy');
    if (!copy2) return;
    if (mode === 2) {
        copy2.style.display = 'block';
        syncTuCopies();
    } else {
        copy2.style.display = 'none';
    }
}


// =========================================================
// 7. DỮ LIỆU MẪU & XÓA TRẮNG FORM
// =========================================================

// Tải dữ liệu mẫu Phiếu Đề Nghị Tạm Ứng
function loadTuSampleData() {
    document.getElementById('tu-khoa').value = 'KHOA NHI';
    document.getElementById('tu-so-phieu').value = '342301';
    document.getElementById('tu-ma-ba-input').value = '2510100555';
    document.getElementById('tu-ho-ten').value = 'BỆNH NHÂN ẢO';
    document.getElementById('tu-tuoi').value = '7';
    document.getElementById('tu-gioi-tinh').value = 'Nam';
    document.getElementById('tu-ma-bn').value = '25029102';
    document.getElementById('tu-so-vao-vien').value = '007162';
    document.getElementById('tu-doi-tuong').value = 'Viện Phí';
    document.getElementById('tu-dia-chi').value = 'Phường Sa Đéc-Tỉnh Đồng Tháp';
    document.getElementById('tu-so-tien').value = '1,000';
    document.getElementById('tu-noi-dung').value = 'Thu tạm ứng';
    document.getElementById('tu-ngay').value = '13';
    document.getElementById('tu-thang').value = '10';
    document.getElementById('tu-nam').value = '2026';
    document.getElementById('tu-nguoi-lap').value = 'KS. Phạm Ngọc Ân';
    syncTuCopies();
}

// Tải dữ liệu mẫu Phiếu Thu Tiền Tạm Ứng (BN: Nguyễn Thị Lạc, 73 tuổi, 1.000.000đ)
function loadPthSampleData() {
    document.getElementById('pth-so').value = '37896';
    document.getElementById('pth-quyen').value = 'TU.TRUC-2026';
    document.getElementById('pth-ma-vp').value = 'TN00387791';
    document.getElementById('pth-ma-ba-input').value = '2609210927';
    document.getElementById('pth-ho-ten').value = 'NGUYỄN THỊ LẠC';
    document.getElementById('pth-tuoi').value = '73';
    document.getElementById('pth-gioi-tinh').value = 'Nữ';
    document.getElementById('pth-dia-chi').value = 'Long Phú-Xã Hòa Long-Tỉnh Đồng Tháp';
    document.getElementById('pth-khoa').value = 'KHOA HỒI SỨC CẤP CỨU';
    document.getElementById('pth-so-tien').value = '1.000.000';
    document.getElementById('pth-bang-chu').value = 'Một triệu  đồng';
    document.getElementById('pth-ly-do').value = 'Tạm ứng cho viện phí TN00387791 - lần 1';
    document.getElementById('pth-gio').value = '16';
    document.getElementById('pth-phut').value = '09';
    document.getElementById('pth-ngay').value = '13';
    document.getElementById('pth-thang').value = '10';
    document.getElementById('pth-nam').value = '2026';
    document.getElementById('pth-nguoi-thu').value = 'Trần Thị Cẩm Nhung';
    updatePthBarcode('2609210927');
}

// Tải mẫu dữ liệu tương ứng với biểu mẫu đang mở
function loadSampleDataForCurrentForm() {
    if (currentActiveForm === 'tamung') {
        loadTuSampleData();
    } else if (currentActiveForm === 'phieuthu') {
        loadPthSampleData();
    }
}

// Xóa sạch toàn bộ dữ liệu ô nhập (Trả về Form Rỗng)
function clearAllData() {
    const inputs = document.querySelectorAll('.editable-input, .editable-textarea, .editable-textarea-short, .editable-select, .auto-resize-textarea');
    inputs.forEach(input => {
        if (input.id === 'input-nam' || input.id === 'ck-nam' || input.id === 'ck-doc-nam' || input.id === 'tu-nam' || input.id === 'tu-nam-2' || input.id === 'pth-nam') {
            input.value = new Date().getFullYear();
        } else if (input.id === 'tu-ngay' || input.id === 'tu-ngay-2' || input.id === 'pth-ngay') {
            input.value = String(new Date().getDate()).padStart(2, '0');
        } else if (input.id === 'tu-thang' || input.id === 'tu-thang-2' || input.id === 'pth-thang') {
            input.value = String(new Date().getMonth() + 1).padStart(2, '0');
        } else if (input.id === 'pth-gio') {
            input.value = String(new Date().getHours()).padStart(2, '0');
        } else if (input.id === 'pth-phut') {
            input.value = String(new Date().getMinutes()).padStart(2, '0');
        } else {
            input.value = '';
        }
        if (input.tagName.toLowerCase() === 'textarea') {
            autoResizeTextarea(input);
        }
    });

    const editables = document.querySelectorAll('.editable-content-span, [contenteditable="true"]');
    editables.forEach(el => el.innerText = '');

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);

    const datePickers = document.querySelectorAll('.date-picker-hidden');
    datePickers.forEach(dp => dp.value = '');

    updateBarcode();
    updateTuBarcode('');
    updatePthBarcode('');
}
