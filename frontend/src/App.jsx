import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';


// Translation object
const translations = {
  en: {
    quilbot: 'NewsBot',
    summarizer: 'Summarizer',
    upgrade: '✨ Upgrade to Premium',
    modes: 'Modes:',
    paragraph: 'Paragraph',
    bulletPoints: 'Bullet Points',
    custom: 'Custom',
    summaryLength: 'Summary Length:',
    pasteText: '📋 Paste Text',
    uploadDoc: '📤 Upload Doc',
    summarize: '✨ Summarize',
    summarizing: '⏳ Summarizing...',
    fileInfo: 'words',
    characters: 'characters',
    summaryAppears: 'Summary will appear here',
    generatingSummary: 'Generating summary...',
    mayTake: 'This may take 10-30 seconds',
    excellent: 'Excellent',
    reviews: 'reviews on Trustpilot',
    customFormatHint: '📝 Describe how you want the summary formatted',
    textTooShort: 'Text is too short. Please enter at least 20 words. Current:',
    enterText: 'Please enter or upload text to summarize',
    specifyFormat: 'Please specify your custom format',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    language: 'English',
    help: 'Help Center',
    contact: 'Contact us',
  },
  de: {
    quilbot: 'NewsBot',
    summarizer: 'Zusammenfasser',
    upgrade: '✨ Upgrade auf Premium',
    modes: 'Modi:',
    paragraph: 'Absatz',
    bulletPoints: 'Aufzählungspunkte',
    custom: 'Benutzerdefiniert',
    summaryLength: 'Zusammenfassungslänge:',
    pasteText: '📋 Text einfügen',
    uploadDoc: '📤 Dokument hochladen',
    summarize: '✨ Zusammenfassen',
    summarizing: '⏳ Zusammenfassender...',
    fileInfo: 'Wörter',
    characters: 'Zeichen',
    summaryAppears: 'Zusammenfassung wird hier angezeigt',
    generatingSummary: 'Zusammenfassung wird generiert...',
    mayTake: 'Dies kann 10-30 Sekunden dauern',
    excellent: 'Ausgezeichnet',
    reviews: 'Bewertungen auf Trustpilot',
    customFormatHint: '📝 Beschreiben Sie, wie die Zusammenfassung formatiert werden soll',
    textTooShort: 'Text ist zu kurz. Bitte geben Sie mindestens 20 Wörter ein. Aktuell:',
    enterText: 'Bitte geben Sie Text ein oder laden Sie einen hoch',
    specifyFormat: 'Bitte geben Sie Ihr benutzerdefiniertes Format an',
    darkMode: 'Dunkler Modus',
    lightMode: 'Heller Modus',
    language: 'Deutsch',
    help: 'Hilfezentrum',
    contact: 'Kontaktieren Sie uns',
  },
  fr: {
    quilbot: 'NewsBot',
    summarizer: 'Résumeur',
    upgrade: '✨ Passer à Premium',
    modes: 'Modes:',
    paragraph: 'Paragraphe',
    bulletPoints: 'Points à puces',
    custom: 'Personnalisé',
    summaryLength: 'Longueur du résumé:',
    pasteText: '📋 Coller le texte',
    uploadDoc: '📤 Télécharger un document',
    summarize: '✨ Résumer',
    summarizing: '⏳ Résumé en cours...',
    fileInfo: 'mots',
    characters: 'caractères',
    summaryAppears: 'Le résumé apparaîtra ici',
    generatingSummary: 'Génération du résumé...',
    mayTake: 'Cela peut prendre 10-30 secondes',
    excellent: 'Excellent',
    reviews: 'avis sur Trustpilot',
    customFormatHint: '📝 Décrivez comment vous souhaitez que le résumé soit formaté',
    textTooShort: 'Le texte est trop court. Veuillez entrer au moins 20 mots. Actuellement:',
    enterText: 'Veuillez entrer ou télécharger du texte à résumer',
    specifyFormat: 'Veuillez spécifier votre format personnalisé',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    language: 'Français',
    help: 'Centre d\'aide',
    contact: 'Nous contacter',
  },
  es: {
    quilbot: 'NewsBot',
    summarizer: 'Resumidor',
    upgrade: '✨ Actualizar a Premium',
    modes: 'Modos:',
    paragraph: 'Párrafo',
    bulletPoints: 'Puntos de viñeta',
    custom: 'Personalizado',
    summaryLength: 'Longitud del resumen:',
    pasteText: '📋 Pegar texto',
    uploadDoc: '📤 Cargar documento',
    summarize: '✨ Resumir',
    summarizing: '⏳ Resumiendo...',
    fileInfo: 'palabras',
    characters: 'caracteres',
    summaryAppears: 'El resumen aparecerá aquí',
    generatingSummary: 'Generando resumen...',
    mayTake: 'Esto puede tomar 10-30 segundos',
    excellent: 'Excelente',
    reviews: 'reseñas en Trustpilot',
    customFormatHint: '📝 Describe cómo deseas que se formatee el resumen',
    textTooShort: 'El texto es demasiado corto. Por favor ingresa al menos 20 palabras. Actual:',
    enterText: 'Por favor, ingresa o carga un texto para resumir',
    specifyFormat: 'Por favor especifica tu formato personalizado',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    language: 'Español',
    help: 'Centro de ayuda',
    contact: 'Contáctanos',
  },
  nl: {
    quilbot: 'NewsBot',
    summarizer: 'Samenvatter',
    upgrade: '✨ Upgrade naar Premium',
    modes: 'Modi:',
    paragraph: 'Alinea',
    bulletPoints: 'Opsommingstekens',
    custom: 'Aangepast',
    summaryLength: 'Samenvattingslengte:',
    pasteText: '📋 Plakken',
    uploadDoc: '📤 Document uploaden',
    summarize: '✨ Samenvatten',
    summarizing: '⏳ Samenvattend...',
    fileInfo: 'woorden',
    characters: 'karakters',
    summaryAppears: 'Samenvatting verschijnt hier',
    generatingSummary: 'Samenvatting genereren...',
    mayTake: 'Dit kan 10-30 seconden duren',
    excellent: 'Uitstekend',
    reviews: 'reviews op Trustpilot',
    customFormatHint: '📝 Beschrijf hoe je de samenvatting wilt opmaken',
    textTooShort: 'Tekst is te kort. Voer minimaal 20 woorden in. Huidig:',
    enterText: 'Voer alstublieft tekst in of upload deze',
    specifyFormat: 'Geef alstublieft uw aangepaste indeling op',
    darkMode: 'Donkere modus',
    lightMode: 'Lichte modus',
    language: 'Nederlands',
    help: 'Hulpcentrum',
    contact: 'Neem contact op',
  },
  pt: {
    quilbot: 'NewsBot',
    summarizer: 'Resumidor',
    upgrade: '✨ Atualizar para Premium',
    modes: 'Modos:',
    paragraph: 'Parágrafo',
    bulletPoints: 'Pontos com marcadores',
    custom: 'Personalizado',
    summaryLength: 'Comprimento do resumo:',
    pasteText: '📋 Colar texto',
    uploadDoc: '📤 Carregar documento',
    summarize: '✨ Resumir',
    summarizing: '⏳ Resumindo...',
    fileInfo: 'palavras',
    characters: 'caracteres',
    summaryAppears: 'O resumo aparecerá aqui',
    generatingSummary: 'Gerando resumo...',
    mayTake: 'Isso pode levar 10-30 segundos',
    excellent: 'Excelente',
    reviews: 'avaliações no Trustpilot',
    customFormatHint: '📝 Descreva como você quer que o resumo seja formatado',
    textTooShort: 'O texto é muito curto. Por favor, digite pelo menos 20 palavras. Atual:',
    enterText: 'Por favor, digite ou carregue o texto para resumir',
    specifyFormat: 'Por favor especifique seu formato personalizado',
    darkMode: 'Modo escuro',
    lightMode: 'Modo claro',
    language: 'Português',
    help: 'Centro de ajuda',
    contact: 'Entre em contato',
  },
};


function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [outputWordCount, setOutputWordCount] = useState(0);
  const [selectedMode, setSelectedMode] = useState('paragraph');
  const [selectedModel, setSelectedModel] = useState('bart');
  const [summaryLength, setSummaryLength] = useState(0.5);
  const [customFormat, setCustomFormat] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const textInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const dragAreaRef = useRef(null);
  const dropdownRef = useRef(null);


  const t = translations[language];


  // Hide splash screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);


    return () => clearTimeout(timer);
  }, []);


  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };


    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const getLevelLabel = (value) => {
    if (value <= 0.2) return 'Very Short';
    if (value <= 0.4) return 'Short';
    if (value <= 0.6) return 'Medium';
    if (value <= 0.8) return 'Long';
    return 'Very Long';
  };


  const getLengthRange = (value) => {
    if (value <= 0.2) return { min: 10, max: 30 };
    if (value <= 0.4) return { min: 30, max: 50 };
    if (value <= 0.6) return { min: 50, max: 75 };
    if (value <= 0.8) return { min: 75, max: 100 };
    return { min: 100, max: 150 };
  };


  const handleTextChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
    setError('');
  };


  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
      setError('');
      setSuccessMessage('Text pasted successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError('Failed to read clipboard. Please try again.');
    }
  };


  const processFile = async (file) => {
    try {
      if (!file) return;


      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('File size exceeds 5MB limit');
        return;
      }


      let text = '';


      if (file.type === 'text/plain') {
        text = await file.text();
      } else if (file.type === 'application/pdf') {
        setError('PDF parsing requires additional library. Please use .txt files.');
        return;
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setError('DOCX parsing requires additional library. Please use .txt files.');
        return;
      } else {
        setError('Please upload a .txt file');
        return;
      }


      if (text.trim()) {
        setInputText(text);
        setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
        setSuccessMessage(`File uploaded successfully! (${Math.round(file.size / 1024)} KB)`);
        setTimeout(() => setSuccessMessage(''), 2000);
        setError('');
      } else {
        setError('Uploaded file is empty');
      }
    } catch (err) {
      setError(`Failed to read file: ${err.message}`);
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };


  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };


  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);


    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      processFile(file);
    }
  };


  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  const handleLengthChange = (e) => {
    const value = parseFloat(e.target.value);
    setSummaryLength(value);
  };


  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    if (mode !== 'custom') {
      setShowCustomInput(false);
      setCustomFormat('');
    }
  };


  const handleCustomFormatChange = (e) => {
    setCustomFormat(e.target.value);
  };


  // ============================================================================
  // 🎯 UPDATED FUNCTION - DIRECT HUGGING FACE API CALL
  // ============================================================================
  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError(t.enterText);
      return;
    }
  
    if (wordCount < 20) {
      setError(`${t.textTooShort} ${wordCount} words`);
      return;
    }
  
    if (selectedMode === 'custom' && !customFormat.trim()) {
      setError(t.specifyFormat);
      return;
    }
  
    setLoading(true);
    setError('');
    setSummary('');
  
    try {
      setSuccessMessage('🔄 Connecting to AI model... (This may take 10-30 seconds on first use)');
  
      const lengthRange = getLengthRange(summaryLength);
  
      // GET TOKEN FROM NETLIFY ENVIRONMENT VARIABLE
      const HF_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;
  
      if (!HF_API_TOKEN) {
        setError('❌ API token not configured. Please add VITE_HF_API_TOKEN to Netlify environment variables.');
        setLoading(false);
        return;
      }
  
      // DIRECT CALL TO HUGGING FACE - NO BACKEND NEEDED!
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        {
          inputs: inputText,
          parameters: {
            min_length: lengthRange.min,
            max_length: lengthRange.max,
          },
          options: { wait_for_model: true }
        },
        {
          headers: {
            'Authorization': `Bearer ${HF_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          timeout: 180000
        }
      );
  
      // EXTRACT SUMMARY
      let summaryText = '';
      if (Array.isArray(response.data) && response.data.length > 0) {
        summaryText = response.data[0].summary_text || '';
      } else if (response.data.summary_text) {
        summaryText = response.data.summary_text;
      }
  
      if (!summaryText) {
        throw new Error('No summary generated');
      }
  
      // APPLY FORMATTING (Bullets/Custom)
      if (selectedMode === 'bullets') {
        const sentences = summaryText.split('. ').filter(s => s.trim());
        summaryText = sentences.map(s => {
          const clean = s.trim();
          return `• ${clean}${clean.endsWith('.') ? '' : '.'}`;
        }).join('\n');
      } else if (selectedMode === 'custom' && customFormat) {
        const lower = customFormat.toLowerCase();
        if (lower.includes('number')) {
          const sentences = summaryText.split('. ').filter(s => s.trim());
          summaryText = sentences.map((s, i) => {
            const clean = s.trim();
            return `${i + 1}. ${clean}${clean.endsWith('.') ? '' : '.'}`;
          }).join('\n');
        }
      }
  
      setSummary(summaryText);
      setOutputWordCount(summaryText.split(/\s+/).filter(w => w).length);
      setSuccessMessage('✅ Summary generated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
  
    } catch (err) {
      console.error('Error:', err);
  
      if (err.response?.status === 401) {
        setError('❌ Invalid API token');
      } else if (err.response?.status === 429) {
        setError('❌ Rate limited: Wait 5 minutes');
      } else if (err.response?.status === 503) {
        setError('❌ Model loading: Try again in 30 seconds');
      } else {
        setError(`❌ Error: ${err.response?.data?.error || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // ============================================================================


  // SPLASH SCREEN
  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <div className="splash-logo">📝</div>
          <h1 className="splash-title">NewsBot</h1>
          <p className="splash-subtitle">AI News Summarizer</p>
          <div className="splash-loader">
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
          </div>
          <p className="splash-text">Powered by Hugging Face</p>
        </div>
      </div>
    );
  }


  return (
    <div className={`quilbot-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Left Sidebar */}
      <aside className="left-sidebar">
        <div className="sidebar-logo">
          <div className="logo-circle">🎯</div>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-icon active" title="Home">🏠</button>
        </nav>
      </aside>


      {/* Main Content */}
      <div className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <h1 className="app-title">{t.quilbot}</h1>
          </div>
          <div className="header-center">
            <h2 className="page-title">{t.summarizer}</h2>
          </div>
          <div className="header-right">
            <button className="upgrade-btn">{t.upgrade}</button>
            
            {/* Profile Dropdown Button */}
            <div className="dropdown-container" ref={dropdownRef}>
              <button 
                className="profile-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                👤
              </button>


              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="dropdown-menu">
                  {/* Dark Mode Toggle */}
                  <div className="dropdown-item dark-mode-toggle">
                    <div className="toggle-content">
                      <span className="toggle-icon">🌙</span>
                      <span className="toggle-text">{darkMode ? t.lightMode : t.darkMode}</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>


                  {/* Language Selector */}
                  <div className="dropdown-item language-selector">
                    <div className="language-header">
                      <span className="language-icon">🌐</span>
                      <span className="language-text">{t.language}</span>
                    </div>
                    <div className="language-list">
                      <button 
                        className={`language-option ${language === 'en' ? 'active' : ''}`}
                        onClick={() => setLanguage('en')}
                      >
                        English ✓
                      </button>
                      <button 
                        className={`language-option ${language === 'de' ? 'active' : ''}`}
                        onClick={() => setLanguage('de')}
                      >
                        Deutsch ✓
                      </button>
                      <button 
                        className={`language-option ${language === 'fr' ? 'active' : ''}`}
                        onClick={() => setLanguage('fr')}
                      >
                        Français ✓
                      </button>
                      <button 
                        className={`language-option ${language === 'es' ? 'active' : ''}`}
                        onClick={() => setLanguage('es')}
                      >
                        Español ✓
                      </button>
                      <button 
                        className={`language-option ${language === 'nl' ? 'active' : ''}`}
                        onClick={() => setLanguage('nl')}
                      >
                        Nederlands ✓
                      </button>
                      <button 
                        className={`language-option ${language === 'pt' ? 'active' : ''}`}
                        onClick={() => setLanguage('pt')}
                      >
                        Português ✓
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>


        {/* Controls Section */}
        <div className="controls-section">
          {/* Modes */}
          <div className="modes-group">
            <span className="modes-label">{t.modes}</span>
            <button 
              className={`mode-btn ${selectedMode === 'paragraph' ? 'active' : ''}`}
              onClick={() => handleModeChange('paragraph')}
            >
              {t.paragraph}
            </button>
            <button 
              className={`mode-btn ${selectedMode === 'bullets' ? 'active' : ''}`}
              onClick={() => handleModeChange('bullets')}
            >
              {t.bulletPoints}
            </button>
            <button 
              className={`mode-btn ${selectedMode === 'custom' ? 'active' : ''}`}
              onClick={() => {
                handleModeChange('custom');
                setShowCustomInput(true);
              }}
            >
              {t.custom}
            </button>
          </div>


          {/* Summary Length Slider */}
          <div className="length-group">
            <span className="length-label">{t.summaryLength}</span>
            <span className="length-label-value">{getLevelLabel(summaryLength)}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={summaryLength}
              onChange={handleLengthChange}
              className="length-slider"
            />
          </div>


          {/* Icons on right */}
          <button className="icon-btn">📋</button>
        </div>


        {/* Custom Format Input */}
        {showCustomInput && selectedMode === 'custom' && (
          <div className="custom-format-section">
            <input
              type="text"
              value={customFormat}
              onChange={handleCustomFormatChange}
              placeholder={t.customFormatHint}
              className="custom-format-input"
            />
            <p className="custom-format-hint">{t.customFormatHint}</p>
          </div>
        )}


        {/* Content Area - FULL SCREEN */}
        <div className="content-area">
          {/* Left Panel - Input */}
          <div className="input-panel">
            {/* Text Area Wrapper with Drag & Drop */}
            <div
              ref={dragAreaRef}
              className={`text-area-wrapper ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                ref={textInputRef}
                value={inputText}
                onChange={handleTextChange}
                placeholder={isDragging ? 'Drop your file here...' : ''}
                className="text-area"
              />
              {isDragging && (
                <div className="drag-overlay">
                  <div className="drag-content">
                    📄 Drop file here to upload
                  </div>
                </div>
              )}
            </div>


            {/* Buttons Row */}
            <div className="buttons-row">
              <button 
                onClick={handlePasteText}
                className="action-btn paste-btn"
                type="button"
              >
                {t.pasteText}
              </button>


              <button 
                className="action-btn upload-btn"
                onClick={triggerFileInput}
                type="button"
              >
                {t.uploadDoc}
              </button>


              <input 
                ref={fileInputRef}
                type="file" 
                onChange={handleFileUpload}
                className="file-input"
                accept=".txt,.pdf,.docx"
                style={{ display: 'none' }}
              />
            </div>


            {/* File Info */}
            {inputText && (
              <div className="file-info">
                📊 {wordCount} {t.fileInfo} • {inputText.length} {t.characters}
              </div>
            )}
          </div>


          {/* Right Panel - Output */}
          <div className="output-panel">
            {/* Output Area */}
            <div className="output-area">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>{t.generatingSummary}</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>{t.mayTake}</p>
                </div>
              ) : summary ? (
                <div className="summary-display">
                  {summary}
                </div>
              ) : (
                <div className="empty-output">
                  {t.summaryAppears}
                </div>
              )}
            </div>


            {/* Bottom Info */}
            <div className="output-bottom">
              <span className="word-info">
                {outputWordCount} {t.fileInfo}
              </span>
            </div>
          </div>
        </div>


        {/* Bottom Button Area */}
        <div className="bottom-button-area">
          <button 
            onClick={handleSummarize}
            disabled={loading || !inputText.trim()}
            className="summarize-btn"
          >
            {loading ? t.summarizing : t.summarize}
          </button>
          <span className="result-text">0 sentences • 0 words</span>
        </div>


        {/* Messages */}
        {error && <div className="error-message">❌ {error}</div>}
        {successMessage && <div className="success-message">✅ {successMessage}</div>}


        {/* Footer */}
        <footer className="footer-section">
          <p>{t.excellent}</p>
          <div className="ratings">⭐⭐⭐⭐⭐</div>
          <p className="rating-link">6,861 {t.reviews}</p>
        </footer>
      </div>
    </div>
  );
}


export default App;
