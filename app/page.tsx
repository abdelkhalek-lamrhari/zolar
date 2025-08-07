'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Instagram, Globe, Mail, Phone, MapPin, Download, Share2, Zap, ExternalLink, Copy, Check } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function ZolarContact() {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const contactInfo = {
    name: "ZOLAR",
    title: "Moroccan Streetwear Brand",
    tagline: "By hustlers, for hustlers",
    values: ["Discipline", "Knowledge", "Power"],
    email: "contact@zolar.ma", // This email is still in the contactInfo object, but the UI element is removed.
    phone: "+212 XXX XXX XXX",
    website: "https://www.zolar.ma",
    instagram: "https://www.instagram.com/zolar.off/",
    location: "Morocco",
    description: "ZOLAR ⚡ Moroccan-born streetwear by hustlers, for hustlers"
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      })
    }
  }

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:${contactInfo.title}
EMAIL:${contactInfo.email}
TEL:${contactInfo.phone}
URL:${contactInfo.website}
NOTE:${contactInfo.description}
END:VCARD`

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'zolar-contact.vcf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    toast({
      title: "Downloaded!",
      description: "Contact saved to your device",
    })
  }

  const shareContact = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: contactInfo.name,
          text: contactInfo.description,
          url: contactInfo.website
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      copyToClipboard(contactInfo.website, "Website URL")
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-mono">
      {/* Background with ZOLAR logo stars */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/zolar-logo-bg.webp')] bg-[size:20px_20px] bg-repeat opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.05),transparent_70%)] animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-lime-500 rounded-full mix-blend-screen blur-3xl opacity-10 animate-blob-1" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-screen blur-3xl opacity-10 animate-blob-2" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 bg-gradient-to-br from-lime-500 to-green-600 rounded-full flex items-center justify-center shadow-neon-lg border-2 border-lime-400/50 overflow-hidden">
              <Image 
                src="/zolar-logo.png" 
                alt="ZOLAR Logo" 
                width={100} 
                height={100} 
                className="w-full h-full object-cover scale-110 drop-shadow-neon-sm" 
              />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 to-green-500 rounded-full blur-xl opacity-40 animate-pulse-fast" />
          </div>
          
          <h1 className="text-5xl font-black mb-2 text-shadow-neon-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-green-300 to-lime-500">
              {contactInfo.name}
            </span>
          </h1>
          
          <p className="text-lime-400 font-semibold text-xl mb-2 text-shadow-neon-sm">
            {contactInfo.title}
          </p>
          
          <p className="text-gray-300 text-sm mb-4">
            {contactInfo.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {contactInfo.values.map((value, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-lime-400/50 text-lime-400 bg-lime-400/10 hover:bg-lime-400/20 transition-colors shadow-neon-sm"
              >
                {value}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Contact Card */}
        <Card className="bg-gray-950/70 border-lime-400/30 shadow-neon-xl backdrop-blur-md mb-6 animate-fade-in-up delay-200">
          <CardContent className="p-6 space-y-4">
            {/* Contact Actions */}
            

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Website */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-lime-400/20 hover:border-lime-400/40 transition-colors group shadow-neon-xs cursor-pointer" onClick={() => window.open(contactInfo.website, '_blank')}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lime-400/20 rounded-lg flex items-center justify-center border border-lime-400/30">
                    <Globe className="w-5 h-5 text-lime-400 drop-shadow-neon-xs" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Website</p>
                    <p className="text-white font-medium text-shadow-neon-xs">zolar.ma</p>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-lime-400/20 hover:border-lime-400/40 transition-colors group shadow-neon-xs cursor-pointer" onClick={() => window.open(contactInfo.instagram, '_blank')}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lime-400/20 rounded-lg flex items-center justify-center border border-lime-400/30">
                    <Instagram className="w-5 h-5 text-lime-400 drop-shadow-neon-xs" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Instagram</p>
                    <p className="text-white font-medium text-shadow-neon-xs">@zolar.off</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              

              {/* Location */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-lime-400/20 hover:border-lime-400/40 transition-colors group shadow-neon-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lime-400/20 rounded-lg flex items-center justify-center border border-lime-400/30">
                    <MapPin className="w-5 h-5 text-lime-400 drop-shadow-neon-xs" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white font-medium text-shadow-neon-xs">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in-up delay-400">
          <p className="text-gray-500 text-sm mb-2">
            🔥 WAITING LIST OPEN — join the grind
          </p>
          <div className="flex items-center justify-center space-x-2 text-lime-400 text-shadow-neon-xs">
            <Image src="/zolar-footer-logo.webp" alt="ZOLAR Logo" width={16} height={16} className="w-4 h-4 drop-shadow-neon-xs" />
            <span className="text-sm font-semibold">Powered by ZOLAR</span>
            <Image src="/zolar-footer-logo.webp" alt="ZOLAR Logo" width={16} height={16} className="w-4 h-4 drop-shadow-neon-xs" />
          </div>
        </div>
      </div>
    </div>
  )
}
