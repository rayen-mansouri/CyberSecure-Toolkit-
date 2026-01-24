import { useState } from 'react'

function PasswordGenerator({ onBack }) {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [analyzeInput, setAnalyzeInput] = useState('')
  const [strength, setStrength] = useState(null)

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === '') {
      alert('Select at least one character type')
      return
    }

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(newPassword)
  }

  const analyzePassword = (pwd) => {
    if (!pwd) {
      setStrength(null)
      return
    }

    let score = 0
    const feedback = []
    const detectedCharTypes = []

    // Length scoring (most important)
    if (pwd.length >= 8) score += 15
    if (pwd.length >= 12) score += 15
    if (pwd.length >= 16) score += 15
    if (pwd.length >= 20) score += 10

    if (pwd.length < 8) feedback.push('Too short - use at least 8 characters')
    if (pwd.length > 32) feedback.push('Consider shortening - very long passwords may be hard to remember')

    // Character variety
    const hasLower = /[a-z]/.test(pwd)
    const hasUpper = /[A-Z]/.test(pwd)
    const hasNumbers = /[0-9]/.test(pwd)
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pwd)

    if (hasLower) {
      score += 15
      detectedCharTypes.push('lowercase')
    } else {
      feedback.push('Add lowercase letters (a-z)')
    }

    if (hasUpper) {
      score += 15
      detectedCharTypes.push('UPPERCASE')
    } else {
      feedback.push('Add uppercase letters (A-Z)')
    }

    if (hasNumbers) {
      score += 15
      detectedCharTypes.push('numbers')
    } else {
      feedback.push('Add numbers (0-9)')
    }

    if (hasSymbols) {
      score += 20
      detectedCharTypes.push('symbols')
    } else {
      feedback.push('Add special characters (!@#$%^&*)')
    }

    // Check for common patterns
    if (/(.)\1{2,}/.test(pwd)) {
      feedback.push('Avoid repeating characters (aaa, 111, etc.)')
      score -= 10
    }

    if (/^[a-z]+[0-9]+$|^[0-9]+[a-z]+$/.test(pwd.toLowerCase())) {
      feedback.push('Avoid simple patterns (letters then numbers)')
      score -= 5
    }

    if (/123|234|345|456|567|678|789|890|012|abc|bcd|cde/.test(pwd.toLowerCase())) {
      feedback.push('Avoid sequential patterns (123, abc, etc.)')
      score -= 10
    }

    // Common weak passwords
    const weakPasswords = ['password', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', '123456']
    if (weakPasswords.some(weak => pwd.toLowerCase().includes(weak))) {
      feedback.push('Avoid common dictionary words')
      score -= 20
    }

    // Entropy calculation (rough)
    const charsetSize = (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasNumbers ? 10 : 0) + (hasSymbols ? 32 : 0)
    const entropy = pwd.length * Math.log2(charsetSize)
    if (entropy > 80) score += 10

    score = Math.max(0, Math.min(score, 100))

    let level
    if (score < 30) level = 'Weak'
    else if (score < 50) level = 'Fair'
    else if (score < 75) level = 'Good'
    else if (score < 90) level = 'Strong'
    else level = 'Very Strong'

    setStrength({
      score,
      level,
      feedback: feedback.slice(0, 4),
      detectedCharTypes,
      entropy: entropy.toFixed(1)
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    alert('Password copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-terminal-black">
      {/* Header */}
      <div className="border-b border-terminal-green/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">🔐 Password Generator & Analyzer</h1>
          <button
            onClick={onBack}
            className="text-terminal-cyan hover:text-terminal-green transition text-sm"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Generator Section */}
          <div className="border border-terminal-green/20 rounded p-6">
            <h2 className="text-xl font-bold mb-6">Generate Password</h2>

            {/* Length Slider */}
            <div className="mb-6">
              <label className="text-sm text-terminal-cyan mb-2 block">
                Password Length: {length}
              </label>
              <input
                type="range"
                min="4"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-terminal-green"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="accent-terminal-green"
                />
                <span className="text-sm">Uppercase Letters (A-Z)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="accent-terminal-green"
                />
                <span className="text-sm">Lowercase Letters (a-z)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="accent-terminal-green"
                />
                <span className="text-sm">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="accent-terminal-green"
                />
                <span className="text-sm">Special Symbols (!@#$%^&*)</span>
              </label>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePassword}
              className="w-full border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black py-2 px-4 rounded transition-colors mb-4"
            >
              Generate Password
            </button>

            {/* Generated Password Display */}
            {password && (
              <div className="bg-terminal-dark border border-terminal-green/20 p-4 rounded">
                <p className="text-xs text-terminal-cyan/60 mb-2">Generated Password</p>
                <p className="font-mono text-terminal-green break-all mb-3">{password}</p>
                <button
                  onClick={copyToClipboard}
                  className="w-full text-sm border border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-black py-1 px-2 rounded transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>

          {/* Analyzer Section */}
          <div className="border border-terminal-green/20 rounded p-6">
            <h2 className="text-xl font-bold mb-6">Analyze Password Strength</h2>

            <input
              type="password"
              value={analyzeInput}
              onChange={(e) => {
                setAnalyzeInput(e.target.value)
                if (e.target.value) analyzePassword(e.target.value)
              }}
              placeholder="Enter password to analyze..."
              className="w-full px-4 py-2 bg-terminal-dark border border-terminal-green/20 rounded text-terminal-green placeholder-terminal-green/40 mb-6 outline-none focus:border-terminal-green/50"
            />

            {strength && (
              <div className="space-y-4">
                {/* Strength Bar */}
                <div>
                  <p className="text-sm text-terminal-cyan mb-2">
                    Strength: <span className="font-bold">{strength.level}</span> ({strength.score}%)
                  </p>
                  <div className="w-full bg-terminal-dark border border-terminal-green/20 rounded h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        strength.score <= 30
                          ? 'bg-terminal-red'
                          : strength.score <= 60
                          ? 'bg-terminal-yellow'
                          : strength.score <= 80
                          ? 'bg-terminal-cyan'
                          : 'bg-terminal-green'
                      }`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                </div>

                {/* Character Types Detected */}
                {strength.detectedCharTypes.length > 0 && (
                  <div className="bg-terminal-dark border border-terminal-green/20 rounded p-3">
                    <p className="text-xs text-terminal-cyan mb-2">Character types detected:</p>
                    <div className="flex flex-wrap gap-2">
                      {strength.detectedCharTypes.map((type) => (
                        <span
                          key={type}
                          className="text-xs bg-terminal-green/20 text-terminal-green px-2 py-1 rounded"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Entropy */}
                <div className="bg-terminal-dark border border-terminal-green/20 rounded p-3">
                  <p className="text-xs text-terminal-cyan">
                    Password Entropy: <span className="font-bold">{strength.entropy} bits</span>
                  </p>
                  <p className="text-xs text-terminal-green/60 mt-1">
                    {strength.entropy >= 80 ? 'Excellent entropy' : strength.entropy >= 60 ? 'Good entropy' : 'Acceptable entropy'}
                  </p>
                </div>

                {/* Feedback */}
                {strength.feedback.length > 0 && (
                  <div className="bg-terminal-dark border border-terminal-green/20 rounded p-4">
                    <p className="text-xs text-terminal-cyan mb-2">Suggestions for improvement:</p>
                    <ul className="space-y-1">
                      {strength.feedback.map((item, idx) => (
                        <li key={idx} className="text-sm text-terminal-green/70">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {strength.feedback.length === 0 && (
                  <div className="bg-terminal-dark border border-terminal-green/20 rounded p-4">
                    <p className="text-sm text-terminal-green">✓ Excellent password! This is very secure.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator
