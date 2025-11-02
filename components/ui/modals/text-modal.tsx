import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Paragraph from "../typography/paragraph";
import { ChevronRight, X } from "lucide-react";

const TextModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center">
        <Paragraph className="text-lg font-medium" content="See Ingredients" />
        <ChevronRight />
      </AlertDialogTrigger>

      <AlertDialogContent className="w-full px-[30px] font-medium text-lg text-[#3B3B3B] pt-[10px] pb-[30px]">
        <div className="flex justify-end items-end">
          <AlertDialogAction className="size-[30px]  hover:bg-transparent rounded-full bg-[#F5F5F5] border border-[#3B3B3B]">
            <X color="#3B3B3B" className="" />
          </AlertDialogAction>
        </div>
        <AlertDialogHeader className="">
          <AlertDialogTitle>Ingredient List</AlertDialogTitle>

          <AlertDialogDescription className="text-sm font-medium  max-w-[649px] leading-[22px]">
            ALCOHOL DENAT., FRAGRANCE (PARFUM), WATER/EAU (AQUA), HEXYL
            CINNAMAL, DISODIUM EDTA, LIMONENE, ALPHA-ISOMETHYL IONONE, BENZYL
            SALICYLATE, GERANIOL, LINALOOL, HYDROXYCITRONELLAL, EUGENOL, BENZYL
            BENZOATE, CITRONELLOL, CITRAL, FARNESOL, EVERNIA PRUNASTRI EXTRACT,
            BENZYL ALCOHOL, EVERNIA FURFURACEA EXTRACT. IL#3A <br />
            Please note that the ingredient list in the composition by
            SERENA-BRAIDE may change or vary over time. Please refer to the
            product packaging you receive before using for the most up to date
            ingredient list.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TextModal;
