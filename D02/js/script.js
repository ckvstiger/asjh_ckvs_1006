/**
 * D02 課堂專用腳本
 * 主題：AI Q版頭像 (MyQ.jpg) × Gemini 個人網站 × Flutter Android APK 實戰
 * 智光商工資料處理科 × 安溪國中技藝班
 */

document.addEventListener('DOMContentLoaded', () => {
  initWeekSelect();
  initStickyTabs();
  initAvatarPromptGenerator();
  initBioCounter();
  initSimulator();
  initChecklist();
});

// 1. 週次切換下拉選單自動高亮目前週次
function initWeekSelect() {
  const selectEl = document.getElementById('weekSelect');
  if (selectEl) {
    const currentPath = window.location.pathname;
    Array.from(selectEl.options).forEach(opt => {
      if (currentPath.includes(opt.value.replace('../', ''))) {
        opt.selected = true;
      }
    });
  }
}

// 2. 主題分頁錨點平滑滾動與高亮
function initStickyTabs() {
  const tabs = document.querySelectorAll('.topic-tab-link');
  const sections = document.querySelectorAll('.topic-section');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.getAttribute('id');
      }
    });

    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${currentId}`) {
        tab.classList.add('active');
      }
    });
  });
}

// 3. AI Q版頭像 Prompt 組合小工具
function initAvatarPromptGenerator() {
  const genderSel = document.getElementById('avatarGender');
  const styleSel = document.getElementById('avatarStyle');
  const hairSel = document.getElementById('avatarHair');
  const glassesSel = document.getElementById('avatarGlasses');
  const moodSel = document.getElementById('avatarMood');
  const promptOutput = document.getElementById('avatarPromptResult');
  const btnCopy = document.getElementById('btnCopyAvatarPrompt');

  function updateAvatarPrompt() {
    if (!genderSel || !promptOutput) return;
    const gender = genderSel.value;
    const style = styleSel.value;
    const hair = hairSel.value;
    const glasses = glassesSel.value;
    const mood = moodSel.value;

    const promptText = `A hyper-cute 3D chibi character avatar, ${gender} junior high school student from Taiwan, wearing stylish school uniform, with ${hair}, ${glasses}, ${mood}, ${style}, pastel gradient background, soft volumetric studio lighting, Pixar and Pop Mart blind-box figurine aesthetic, 8k resolution, centered composition, perfect for a profile avatar photo named MyQ.jpg`;
    promptOutput.textContent = promptText;
  }

  [genderSel, styleSel, hairSel, glassesSel, moodSel].forEach(el => {
    if (el) el.addEventListener('change', updateAvatarPrompt);
  });

  if (btnCopy && promptOutput) {
    btnCopy.addEventListener('click', () => {
      copyToClipboard(promptOutput.textContent, '✅ 已複製 AI Q 版生成提示詞！可至生圖軟體貼上使用');
    });
  }

  updateAvatarPrompt();
}

// 4. 100 字自我介紹打字即時計數器
function initBioCounter() {
  const bioInput = document.getElementById('studentBioInput');
  const countDisplay = document.getElementById('bioWordCount');
  const progressFill = document.getElementById('bioProgressFill');
  const statusText = document.getElementById('bioCountStatus');

  if (!bioInput || !countDisplay) return;

  function handleBioChange() {
    const text = bioInput.value;
    // 計算中英文字元數（去除多餘空白行）
    const len = text.trim().length;
    countDisplay.textContent = len;

    // 計算百分比（目標 100 字）
    const pct = Math.min(100, Math.round((len / 100) * 100));
    if (progressFill) {
      progressFill.style.width = `${pct}%`;
      if (len < 50) {
        progressFill.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
        if (statusText) statusText.textContent = `（還差 ${100 - len} 字，請繼續充實個人專長與興趣）`;
      } else if (len <= 115) {
        progressFill.style.background = 'linear-gradient(90deg, #10b981, #059669)';
        if (statusText) statusText.textContent = `🎉 非常標準！符合約 100 字自我介紹規範`;
      } else {
        progressFill.style.background = 'linear-gradient(90deg, #3b82f6, #1d4ed8)';
        if (statusText) statusText.textContent = `（稍微超過 100 字，亦屬豐富優秀）`;
      }
    }

    // 連動更新模擬器
    updateSimulatorPreview();
  }

  bioInput.addEventListener('input', handleBioChange);
  handleBioChange();
}

// 5. 雙模實作互動沙盒 (Web vs Flutter Android App)
function initSimulator() {
  const inputName = document.getElementById('simInputName');
  const inputTitle = document.getElementById('simInputTitle');
  const inputSkills = document.getElementById('simInputSkills');
  const inputTheme = document.getElementById('simInputTheme');
  const avatarSelect = document.getElementById('simAvatarSelect');

  // 切換按鈕
  const btnModeWeb = document.getElementById('btnModeWeb');
  const btnModeFlutter = document.getElementById('btnModeFlutter');
  const webContainer = document.getElementById('simWebContainer');
  const flutterContainer = document.getElementById('simFlutterContainer');

  // 功能按鈕
  const btnCopyGeminiPrompt = document.getElementById('btnCopyGeminiPrompt');
  const btnDownloadWebHtml = document.getElementById('btnDownloadWebHtml');
  const btnCopyFlutterDart = document.getElementById('btnCopyFlutterDart');
  const btnSimulateApk = document.getElementById('btnSimulateApk');
  const flutterFab = document.getElementById('flutterFab');

  // 模式切換監聽
  if (btnModeWeb && btnModeFlutter && webContainer && flutterContainer) {
    btnModeWeb.addEventListener('click', () => {
      btnModeWeb.classList.add('active');
      btnModeFlutter.classList.remove('active');
      webContainer.style.display = 'block';
      flutterContainer.style.display = 'none';
    });

    btnModeFlutter.addEventListener('click', () => {
      btnModeFlutter.classList.add('active');
      btnModeWeb.classList.remove('active');
      webContainer.style.display = 'none';
      flutterContainer.style.display = 'flex';
    });
  }

  // 監聽各控制項
  [inputName, inputTitle, inputSkills, inputTheme, avatarSelect].forEach(el => {
    if (el) el.addEventListener('input', updateSimulatorPreview);
    if (el) el.addEventListener('change', updateSimulatorPreview);
  });

  // Flutter FAB 互動
  if (flutterFab) {
    flutterFab.addEventListener('click', () => {
      showToast('📱 Flutter FloatingActionButton 點擊成功！(State: Active)');
    });
  }

  // 複製 Gemini 提示詞
  if (btnCopyGeminiPrompt) {
    btnCopyGeminiPrompt.addEventListener('click', () => {
      const prompt = generateGeminiPrompt();
      copyToClipboard(prompt, '✨ 已複製「Gemini 個人網站專屬 Prompt」！可直接貼給 Gemini 產生網站');
    });
  }

  // 下載個人網頁 index.html
  if (btnDownloadWebHtml) {
    btnDownloadWebHtml.addEventListener('click', () => {
      downloadPersonalWebpage();
    });
  }

  // 複製 Flutter main.dart
  if (btnCopyFlutterDart) {
    btnCopyFlutterDart.addEventListener('click', () => {
      const dartCode = generateFlutterDartCode();
      copyToClipboard(dartCode, '📱 已複製 Flutter main.dart 專案程式碼！');
    });
  }

  // 模擬下載 Android APK
  if (btnSimulateApk) {
    btnSimulateApk.addEventListener('click', () => {
      simulateApkBuild();
    });
  }

  updateSimulatorPreview();
}

// 更新模擬器內容
function updateSimulatorPreview() {
  const name = document.getElementById('simInputName')?.value || '陳小溪';
  const title = document.getElementById('simInputTitle')?.value || '安溪國中 9年級 • 智光資處技藝班學員';
  const bio = document.getElementById('studentBioInput')?.value || '我是安溪國中九年級的陳小溪！每週二最期待到智光商工夢想家電腦教室上技藝班。我對電腦軟體、AI生圖與網頁設計非常有熱忱，希望能透過科技創造有趣的專案，未來也想考取電腦軟體應用證照！';
  const skillsStr = document.getElementById('simInputSkills')?.value || 'AI生圖, 網頁設計, Flutter App, 盲打指法, 商業簡報';
  const avatarUrl = document.getElementById('simAvatarSelect')?.value || 'MyQ.jpg';
  const theme = document.getElementById('simInputTheme')?.value || 'blue';

  const skillList = skillsStr.split(/[,，]/).map(s => s.trim()).filter(Boolean);

  // 更新 Web 視窗
  const webAvatar = document.getElementById('webStudentAvatar');
  const webName = document.getElementById('webStudentName');
  const webSchool = document.getElementById('webStudentSchool');
  const webBio = document.getElementById('webStudentBio');
  const webSkills = document.getElementById('webStudentSkills');

  if (webAvatar) webAvatar.src = avatarUrl;
  if (webName) webName.textContent = name;
  if (webSchool) webSchool.textContent = title;
  if (webBio) webBio.textContent = bio;
  if (webSkills) {
    webSkills.innerHTML = skillList.map(s => `<span class="skill-tag">✨ ${s}</span>`).join('');
  }

  // 更新 Flutter 手機視窗
  const flutterAvatar = document.getElementById('flutterStudentAvatar');
  const flutterName = document.getElementById('flutterStudentName');
  const flutterSchool = document.getElementById('flutterStudentSchool');
  const flutterBio = document.getElementById('flutterStudentBio');
  const flutterSkills = document.getElementById('flutterStudentSkills');
  const flutterAppBarTitle = document.getElementById('flutterAppBarTitle');

  if (flutterAvatar) flutterAvatar.src = avatarUrl;
  if (flutterName) flutterName.textContent = name;
  if (flutterSchool) flutterSchool.textContent = title;
  if (flutterBio) flutterBio.textContent = bio;
  if (flutterSkills) {
    flutterSkills.innerHTML = skillList.map(s => `<span class="skill-tag">📱 ${s}</span>`).join('');
  }
  if (flutterAppBarTitle) flutterAppBarTitle.textContent = `${name} 的個人 App`;
}

// 產出 Gemini 個人網站 Prompt
function generateGeminiPrompt() {
  const name = document.getElementById('simInputName')?.value || '同學姓名';
  const title = document.getElementById('simInputTitle')?.value || '安溪國中技藝班學員';
  const bio = document.getElementById('studentBioInput')?.value || '約100字自我介紹...';
  const skills = document.getElementById('simInputSkills')?.value || 'AI生圖, 網頁設計, Flutter App';

  return `你好 Gemini！我是新北市立安溪國中參加智光商工技藝班（商管職群）的學生 ${name}。
請你扮演資深前端網頁工程師，為我撰寫一份完整的、高品質的個人自我介紹單一網頁（包含 index.html 與現代化內嵌 CSS / JavaScript）。

【網頁規格與內容要求】：
1. 學生姓名：${name}
2. 頭銜標籤：${title}
3. 個人大頭照規定：必須使用相對路徑引用我的 AI Q版頭像 <img src="MyQ.jpg" alt="${name}的Q版頭像">，並設計成圓形頭像帶有呼吸光暈特效。
4. 個人自我介紹（約100字）：
"${bio}"
5. 技能標籤庫：包含 [${skills}]，請用精美膠囊標籤（Badge）呈現。
6. 設計風格：採用 2026 年現代高質感設計風格，使用 Google Fonts (Noto Sans TC)，搭配漸層背景、毛玻璃卡片（Glassmorphism）、微動畫 hover 特效、以及行動裝置完全響應式佈局（Responsive Design）。
7. 請直接輸出完整可執行的單一 HTML 代碼，並在代碼中包含詳細註解，方便我學習修改。感謝你！`;
}

// 產出 Flutter main.dart 程式碼
function generateFlutterDartCode() {
  const name = document.getElementById('simInputName')?.value || '同學姓名';
  const title = document.getElementById('simInputTitle')?.value || '安溪國中技藝班學員';
  const bio = document.getElementById('studentBioInput')?.value || '約100字自我介紹...';

  return `import 'package:flutter/material.dart';

void main() {
  runApp(const StudentProfileApp());
}

class StudentProfileApp extends StatelessWidget {
  const StudentProfileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: '${name}的個人首頁',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF02569B)),
        useMaterial3: true,
      ),
      home: const ProfileHomePage(),
    );
  }
}

class ProfileHomePage extends StatelessWidget {
  const ProfileHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('${name} 的 Flutter App', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF02569B),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Center(
          child: Column(
            children: [
              // 學生 AI Q 版頭像 (assets/MyQ.jpg)
              Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(color: Colors.blue.withOpacity(0.3), blurRadius: 15, spreadRadius: 3),
                  ],
                ),
                child: const CircleAvatar(
                  radius: 55,
                  backgroundImage: AssetImage('assets/MyQ.jpg'),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                '${name}',
                style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF07345D)),
              ),
              const SizedBox(height: 6),
              Chip(
                label: const Text('${title}'),
                backgroundColor: const Color(0xFFE0F2FE),
              ),
              const SizedBox(height: 16),
              Card(
                elevation: 3,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: Text(
                    '${bio}',
                    style: const TextStyle(fontSize: 15, height: 1.6, color: Colors.black87),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('🎉 恭喜你成功在 Android 運行 Flutter App！')),
                  );
                },
                icon: const Icon(Icons.star),
                label: const Text('與我互動'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF3DDC84),
                  foregroundColor: const Color(0xFF064E3B),
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                ),
              )
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF3DDC84),
        child: const Icon(Icons.favorite, color: Colors.white),
      ),
    );
  }
}`;
}

// 下載個人網頁 index.html
function downloadPersonalWebpage() {
  const name = document.getElementById('simInputName')?.value || '學生';
  const title = document.getElementById('simInputTitle')?.value || '安溪國中技藝班學員';
  const bio = document.getElementById('studentBioInput')?.value || '約100字自介';
  const skillsStr = document.getElementById('simInputSkills')?.value || 'AI生圖, 網頁設計, Flutter App';
  const skillList = skillsStr.split(/[,，]/).map(s => s.trim()).filter(Boolean);

  const htmlContent = `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} 的個人官方網站 | 智光商工 × 安溪國中技藝班</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Noto Sans TC', sans-serif;
      background: linear-gradient(135deg, #07345d, #0b4f8a, #02569B);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: #333;
    }
    .profile-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      max-width: 480px;
      width: 100%;
      border-radius: 24px;
      padding: 36px 28px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
    }
    .avatar-wrapper {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto 16px;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #0175C2;
      box-shadow: 0 6px 16px rgba(1,117,194,0.3);
    }
    h1 { font-size: 1.6rem; color: #07345d; margin-bottom: 4px; }
    .badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 18px;
    }
    .bio-box {
      background: #f8fafc;
      border-radius: 14px;
      padding: 16px;
      font-size: 0.95rem;
      line-height: 1.7;
      text-align: justify;
      color: #475569;
      border-left: 4px solid #c98a2c;
      margin-bottom: 20px;
    }
    .skills-title { font-size: 0.88rem; font-weight: 700; color: #64748b; margin-bottom: 8px; }
    .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
    .skill-chip {
      background: #f1f5f9;
      color: #334155;
      padding: 5px 12px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      border: 1px solid #cbd5e1;
    }
    footer { margin-top: 24px; font-size: 0.8rem; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="profile-card">
    <div class="avatar-wrapper">
      <img src="MyQ.jpg" alt="${name}的AI Q版頭像" class="avatar-img">
    </div>
    <h1>${name}</h1>
    <div class="badge">${title}</div>
    <div class="bio-box">${bio}</div>
    <div class="skills-title">專業與興趣領域</div>
    <div class="skills-wrap">
      ${skillList.map(s => `<span class="skill-chip">✨ ${s}</span>`).join('')}
    </div>
    <footer>智光商工資料處理科 × 安溪國中技藝班 (D02 成果)</footer>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}_personal_website.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`📥 成功下載個人網頁 (${name}_personal_website.html)！`);
}

// 模擬 Flutter Android APK 打包生成
function simulateApkBuild() {
  const btn = document.getElementById('btnSimulateApk');
  if (!btn) return;

  btn.disabled = true;
  const originalText = btn.innerHTML;
  btn.innerHTML = '⚙️ 正在執行 flutter build apk --release ...';

  setTimeout(() => {
    btn.innerHTML = '📦 正在壓縮 dex 與打包 assets/MyQ.jpg ...';
  }, 1200);

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    showToast('🎉 Android APK 封裝模擬完成！(app-release.apk 已生成)');
    
    // 建立一個提示下載模擬包
    const dummyContent = 'Chih-Kwang Commercial & Industrial Vocational High School - Anxi Junior High School\nD02 Flutter Android APK Build Simulator Success!\nTarget: app-release.apk';
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_profile_app.apk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 2400);
}

// 6. 課堂任務 Checkbox 本地保存
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  checkboxes.forEach((cb, index) => {
    const saved = localStorage.getItem(`d02_task_${index}`);
    if (saved === 'true') {
      cb.checked = true;
      cb.closest('.checklist-item').classList.add('completed');
    }

    cb.addEventListener('change', () => {
      localStorage.setItem(`d02_task_${index}`, cb.checked);
      if (cb.checked) {
        cb.closest('.checklist-item').classList.add('completed');
        showToast('🎯 任務打勾成功！學習進度已更新');
      } else {
        cb.closest('.checklist-item').classList.remove('completed');
      }
    });
  });
}

// 複製到剪貼簿輔助函式
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage);
  } catch (err) {
    alert('請手動選取並複製文字');
  }
  document.body.removeChild(textArea);
}

// 輕量 Toast 提示視窗
function showToast(message) {
  let toast = document.getElementById('d02Toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'd02Toast';
    toast.className = 'toast-notice success';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
