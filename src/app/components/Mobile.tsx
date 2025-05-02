"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GrPowerReset } from "react-icons/gr";

export default function Mobile() {
  const weightArr = Array.from({ length: 111 }, (_, i) => 40 + i);
  const heightArr = Array.from({ length: 71 }, (_, i) => 140 + i);
  const ageArr = Array.from({ length: 83 }, (_, i) => 18 + i);

  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string>("");
  const [bodyMassIndex, setBodyMassIndex] = useState<number | null>(null);

  const calculateBMI = () => {
    if (!weight || !height || !age || !gender) {
      return toast.error("All fields are required!");
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const formattedBMI = parseFloat(bmi.toFixed(2));
    setBodyMassIndex(formattedBMI);

    toast.success(`BMI: ${formattedBMI}`);
  };

  const resetValue = () => {
    setWeight(null);
    setHeight(null);
    setAge(null);
    setGender("");
    setBodyMassIndex(null);
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md md:max-w-lg bg-zinc-900 border border-zinc-700 shadow-xl rounded-2xl">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl font-bold text-white">
            BMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label className="text-white">Weight (kg)</Label>
            <Select onValueChange={(val) => setWeight(Number(val))}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select your weight</SelectLabel>
                  {weightArr.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {item} kg
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Height (cm)</Label>
            <Select onValueChange={(val) => setHeight(Number(val))}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select your height</SelectLabel>
                  {heightArr.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {item} cm
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Age</Label>
            <Select onValueChange={(val) => setAge(Number(val))}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select your age</SelectLabel>
                  {ageArr.map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {item} years
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Gender</Label>
            <Select onValueChange={(val) => setGender(val)}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectLabel>Select your gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center items-center gap-3">
            <Button
              className="w-[90%] bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={calculateBMI}
            >
              Calculate
            </Button>
            <GrPowerReset
              onClick={resetValue}
              className="w-fit text-white font-bold text-2xl cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {bodyMassIndex && (
        <div className="bg-zinc-900 text-white p-4 mt-6 rounded-lg border border-zinc-700 w-full max-w-md text-center space-y-2">
          <p className="text-xl font-semibold text-blue-400">
            Your Health Metric
          </p>
          <p className="text-base">
            BMI (Body Mass Index):{" "}
            <span className="font-medium text-white">{bodyMassIndex}</span>
          </p>
        </div>
      )}
    </div>
  );
}
