import { useState, useEffect } from 'react'

function Home({ onNavigate }) {
  const tips = [
    "Don't trust unconfidential emails - Always verify sender identity",
    "Use strong passwords - Mix uppercase, lowercase, numbers, and symbols",
    "Enable two-factor authentication - Add an extra layer of security",
    "Never share your passwords - Keep them private and secure",
    "Update your software regularly - Security patches are critical",
    "Be cautious with phishing links - Hover to verify URLs before clicking",
    "Use unique passwords - Don't reuse passwords across websites",
    "Check if your email is breached - Monitor your account security",
    "Lock your device - Always lock when stepping away",
    "Use a VPN on public WiFi - Encrypt your connection and data"
  ]

  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-terminal-black">
      {/* Rotating Tips Section */}
      <div className="border-b border-terminal-green/20 bg-terminal-dark p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-terminal-green/60">💡 SECURITY TIP</p>
            <p className="text-xs text-terminal-green/60">Done by: mouhamed rayen mansouri</p>
          </div>
          <p className="text-lg text-terminal-cyan min-h-8">
            {tips[currentTipIndex]}
          </p>
          <div className="flex gap-1 mt-4">
            {tips.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 ${
                  idx === currentTipIndex
                    ? 'bg-terminal-green'
                    : 'bg-terminal-green/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">🛡️ CyberSecure Toolkit</h1>
          <div className="h-px bg-terminal-green/30 w-32 mb-6"></div>
          <p className="text-terminal-cyan leading-relaxed">
            A beginner-friendly daily-use application that ensures common cybersecurity safety 
            measures. Whether you're protecting your passwords, spotting dangerous links, or 
            checking if your email has been compromised, CyberSecure Toolkit provides simple 
            and effective tools to keep your digital life secure. Start today and take control 
            of your online safety.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Password Generator Card */}
          <button
            onClick={() => onNavigate('password')}
            className="border border-terminal-green/20 p-6 rounded hover:border-terminal-green/50 transition-all duration-300 text-left group"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-terminal-cyan transition">
              🔐 Password Generator
            </h3>
            <p className="text-terminal-green/70 mb-4">
              Generate strong passwords and analyze the strength of your existing passwords. 
              Create secure credentials instantly.
            </p>
            <div className="text-terminal-cyan text-sm">
              Learn More →
            </div>
          </button>

          {/* Phishing Detector Card */}
          <button
            onClick={() => onNavigate('phishing')}
            className="border border-terminal-green/20 p-6 rounded hover:border-terminal-green/50 transition-all duration-300 text-left group"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-terminal-cyan transition">
              🎣 Phishing Detector
            </h3>
            <p className="text-terminal-green/70 mb-4">
              Identify and detect suspicious phishing links before you click. Analyze URLs 
              for security threats and malicious content.
            </p>
            <div className="text-terminal-cyan text-sm">
              Learn More →
            </div>
          </button>

          {/* Breach Checker Card */}
          <button
            onClick={() => onNavigate('breach')}
            className="border border-terminal-green/20 p-6 rounded hover:border-terminal-green/50 transition-all duration-300 text-left group"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-terminal-cyan transition">
              🚨 Breach Checker
            </h3>
            <p className="text-terminal-green/70 mb-4">
              Check if your email has been compromised in known data breaches. Protect your 
              account before it's too late.
            </p>
            <div className="text-terminal-cyan text-sm">
              Learn More →
            </div>
          </button>

          {/* Malware Checker Card */}
          <button
            onClick={() => onNavigate('malware')}
            className="border border-terminal-green/20 p-6 rounded hover:border-terminal-green/50 transition-all duration-300 text-left group"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-terminal-cyan transition">
              🔬 Malware Checker
            </h3>
            <p className="text-terminal-green/70 mb-4">
              Upload and scan files for potential threats and malicious content. Get detailed 
              threat analysis and safety recommendations.
            </p>
            <div className="text-terminal-cyan text-sm">
              Learn More →
            </div>
          </button>

          {/* Website Status Card */}
          <button
            onClick={() => onNavigate('website')}
            className="border border-terminal-green/20 p-6 rounded hover:border-terminal-green/50 transition-all duration-300 text-left group"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-terminal-cyan transition">
              🌐 Is It Down?
            </h3>
            <p className="text-terminal-green/70 mb-4">
              Check if a website is down for everyone or just for you. Get status info and 
              troubleshooting guidance.
            </p>
            <div className="text-terminal-cyan text-sm">
              Learn More →
            </div>
          </button>

          {/* Security Tutorial Card */}
          <button
            onClick={() => onNavigate('tutorial')}
            className="border border-terminal-green/20 p-6 rounded hover:border-terminal-green/50 transition-all duration-300 text-left group"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-terminal-cyan transition">
              🎓 Security Tutorial
            </h3>
            <p className="text-terminal-green/70 mb-4">
              Learn about common social engineering and hacking attacks. Understand threats and 
              discover practical protection strategies.
            </p>
            <div className="text-terminal-cyan text-sm">
              Learn More →
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
