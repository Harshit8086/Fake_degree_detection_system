import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, Globe, Check } from "lucide-react";
import { toast } from "sonner";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Only English and Hindi
const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
];

export const LanguageModal = ({ isOpen, onClose }: LanguageModalProps) => {
  const { i18n } = useTranslation();

  // Local state for selected language
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || "en");

  // Force re-render when i18n language changes
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handleLanguageChanged = () => forceUpdate((v) => v + 1);
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const handleSave = () => {
    if (selectedLanguage !== i18n.language) {
      i18n.changeLanguage(selectedLanguage);
      toast.success(`Language changed to ${languages.find(l => l.code === selectedLanguage)?.name}`);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full h-full sm:h-auto sm:max-h-[80vh] sm:max-w-md flex flex-col rounded-none sm:rounded-lg p-4 sm:p-6"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Select Language</span>
          </DialogTitle>
          <DialogDescription>
            Choose your preferred language for the interface.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-grow space-y-6 pr-2 sm:max-h-[60vh]">
          <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} className="space-y-4">
            {languages.map((language) => (
              <div key={language.code} className="flex items-center space-x-3">
                <RadioGroupItem value={language.code} id={language.code} />
                <Label
                  htmlFor={language.code}
                  className="flex items-center space-x-3 cursor-pointer flex-1"
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{language.name}</span>
                      {language.code === i18n.language && (
                        <Badge variant="secondary" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {language.nativeName}
                    </span>
                  </div>
                  {selectedLanguage === language.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              Language changes are applied immediately across the app.
            </p>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="flex justify-end space-x-2 mt-4 sm:mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Apply Language
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


