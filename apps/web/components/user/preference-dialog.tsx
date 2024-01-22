"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/src/components/alert-dialog";
import { useTranslation } from "react-i18next";
import { Languages, X } from "lucide-react";
import { Button } from "@repo/ui/src/components";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Rating18Plus } from "@repo/ui/src/components/icons";
import { PreferenceSelect } from "../characters/age-restriction";
import { useRouter } from "next/navigation";
import { useNsfwPreference } from "../../app/lib/hooks/use-nsfw-preference";
import { useState } from "react";
import { LanguageSelect } from "../../app/lang-select";

const PreferenceDialog = () => {
  const { t } = useTranslation();
  const { nsfwPreference } = useNsfwPreference();
  const router = useRouter();
  const [isPreferenceReady, setIsPreferenceReady] = useLocalStorage(
    "isPreferenceReadyas",
    false,
  );
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AlertDialog
      open={isOpen && !isPreferenceReady}
      onOpenChange={(value) => {
        setIsOpen(value);
        setIsPreferenceReady(true);
      }}
    >
      <AlertDialogContent>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0"
          onClick={() => {
            setIsOpen(false);
            setIsPreferenceReady(true);
          }}
        >
          <X />
        </Button>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center gap-1 text-3xl">
            {t("Openroleplay.ai")}
          </AlertDialogTitle>
          <div className="flex w-full flex-col items-center justify-center">
            <AlertDialogDescription className="flex flex-col items-center justify-center gap-4">
              <div className="flex text-center text-lg">
                {t(
                  "Welcome to Openroleplay.ai, your open-source AI character platform.",
                )}
              </div>
            </AlertDialogDescription>
          </div>
          <div className="flex flex-col gap-4">
            <AlertDialogTitle className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Languages className="h-5 w-5 text-blue-500" />
                {t("Language")}
              </div>

              <LanguageSelect />
            </AlertDialogTitle>
            <AlertDialogTitle className="flex items-center gap-1">
              <Rating18Plus className="h-5 w-5 text-amber-500" />
              {t("Mature Content")}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="flex">
            {t(
              "Some AI model, character or content is uncensored. By enabling Mature Content, you confirm you are over the age of 18.",
            )}
          </AlertDialogDescription>
          <AlertDialogDescription className="flex rounded-lg bg-amber-100 p-2 text-amber-500 dark:bg-amber-800">
            {t(
              "Despite AI and community moderation efforts, some content is not always accurately classified, so you may still see content you wanted hidden.",
            )}
          </AlertDialogDescription>
          <PreferenceSelect />
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-center">
          <AlertDialogAction
            onClick={
              nsfwPreference === "block" ? () => router.back() : undefined
            }
          >
            {t("Confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PreferenceDialog;
