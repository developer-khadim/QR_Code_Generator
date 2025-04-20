"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, LayoutGrid, Link as LinkIcon, Mail, Smartphone, Sliders } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { QRCodeIcon, SocialIconsCompact } from "./Icons";

function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrType, setQrType] = useState("link");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [size, setSize] = useState(200);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    if (url) {
      setIsGenerated(true);
    }
  }, [url]);

  const handleDownload = (type: "png" | "svg") => {
    const qrCodeElem = document.getElementById("qr-code");

    if (qrCodeElem) {
      if (type === "png") {
        toPng(qrCodeElem)
          .then((dataUrl) => {
            saveAs(dataUrl, "qr-code.png");
          })
          .catch((err) => {
            console.log("Error generating QR code", err);
          });
      } else if (type === "svg") {
        const svgElem = qrCodeElem.querySelector("svg");

        if (svgElem) {  
          const saveData = new Blob([svgElem.outerHTML], {
            type: "image/svg+xml;charset=utf-8",
          });
          saveAs(saveData, "qr-code.svg");
        }
      }
    }
  };

  const handleEmailInput = () => {
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      message
    )}`;

    setUrl(mailToLink);
  };

  return (
    <div className="relative z-30 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-blue-200/20">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QRCodeIcon className="w-8 h-8 text-white animate-pulse-subtle" />
            <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white drop-shadow-md">
              QR Code Generator
            </CardTitle>
          </div>
          <p className="text-blue-100 text-center max-w-2xl mx-auto text-sm sm:text-base">
            Create custom QR codes for your links, emails, and more. Customize colors and download in multiple formats.
          </p>
        </CardHeader>
        
        <CardContent className="p-5 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 space-y-8">
              <Tabs
                defaultValue="link"
                className="space-y-6"
                onValueChange={(val) => {
                  setQrType(val);
                  setUrl("");
                  setIsGenerated(false);
                }}
              >
                <TabsList className="w-full grid grid-cols-2 h-14 rounded-full bg-gray-100/80 p-1.5 border border-gray-200/50">
                  <TabsTrigger 
                    value="link" 
                    className="rounded-full text-sm sm:text-base font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    URL Link
                  </TabsTrigger>
                  <TabsTrigger 
                    value="email" 
                    className="rounded-full text-sm sm:text-base font-medium transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="link" className="focus-visible:outline-none focus-visible:ring-0 space-y-6">
                  <div className="space-y-4 bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm">
                    <div className="space-y-2">
                      <Label
                        htmlFor="url"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        <LinkIcon className="w-4 h-4 mr-2 text-blue-600" />
                        Enter URL
                      </Label>
                      <Input
                        id="url"
                        type="text"
                        value={url}
                        placeholder="https://example.com"
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg bg-white/80 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400 shadow-sm transition-all"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="focus-visible:outline-none focus-visible:ring-0 space-y-6">
                  <div className="space-y-5 bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-2 text-blue-600" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="recipient@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg bg-white/80 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400 shadow-sm transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-sm font-medium text-gray-700"
                      >
                        Subject Line
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        value={subject}
                        placeholder="Enter email subject"
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg bg-white/80 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400 shadow-sm transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700"
                      >
                        Message Body
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        placeholder="Type your message here"
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg bg-white/80 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400 h-24 resize-none shadow-sm transition-all"
                      />
                    </div>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full py-2.5 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      onClick={handleEmailInput}
                    >
                      Generate QR Code
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-5 bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                  <Sliders className="w-4 h-4 mr-2 text-blue-600" />
                  Customize QR Code
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="color"
                      className="text-sm font-medium text-gray-700"
                    >
                      QR Code Color
                    </Label>

                    <div className="flex items-center gap-2">
                      <div
                        className="relative w-12 h-12 rounded-lg shadow-inner overflow-hidden transition-transform hover:scale-105"
                        style={{ backgroundColor: color }}
                      >
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <Input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg bg-white/80 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 shadow-sm transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="bgcolor"
                      className="text-sm font-medium text-gray-700"
                    >
                      Background Color
                    </Label>

                    <div className="flex items-center gap-2">
                      <div
                        className="relative w-12 h-12 rounded-lg shadow-inner overflow-hidden transition-transform hover:scale-105"
                        style={{ backgroundColor: bgColor }}
                      >
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <Input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg bg-white/80 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 shadow-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Label htmlFor="size" className="text-sm font-medium text-gray-700 mb-2 block">
                    QR Code Size: {size}px
                  </Label>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">Small</span>
                    <input
                      type="range"
                      min="100"
                      max="300"
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-xs text-gray-500">Large</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* QR Code Display */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-gradient-to-br from-gray-50/90 to-blue-50/90 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-8 flex flex-col items-center transform transition-all duration-300 hover:shadow-xl">
                <div className="mb-6 text-center">
                  <Smartphone className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-800">Your QR Code</h3>
                  <p className="text-sm text-gray-500">Scan with any mobile device</p>
                </div>
                
                <div 
                  id="qr-code" 
                  className={`p-6 bg-white rounded-xl shadow-md mb-6 transition-all duration-300 ${isGenerated ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}
                  style={{ backgroundColor: bgColor }}
                >
                  {url ? (
                    <QRCodeSVG
                      value={url || "https://example.com"}
                      size={size}
                      fgColor={color}
                      bgColor={bgColor}
                      level="H"
                      includeMargin
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
                      <QRCodeIcon className="w-12 h-12 mb-2 text-gray-300" />
                      <p className="text-gray-400 text-sm text-center">
                        Enter details to generate your QR code
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    onClick={() => handleDownload("png")}
                    disabled={!url}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full py-2.5 transition-all shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span> PNG
                  </Button>
                  <Button
                    onClick={() => handleDownload("svg")}
                    disabled={!url}
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-full py-2.5 transition-all border border-gray-300 shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span> SVG
                  </Button>
                </div>
                
                <div className="w-full mt-6 pt-6 border-t border-gray-200/50 flex justify-center">
                  <SocialIconsCompact />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QrCodeGenerator;
