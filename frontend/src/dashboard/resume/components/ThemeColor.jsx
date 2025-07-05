import React, { useContext, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { api } from '@/lib/api'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
  const colors = [
  // 🔥 Basic primaries
  "#FF0000", "#00FF00", "#0000FF",

  // 🍋 Secondary colors
  "#FFFF00", "#FF00FF", "#00FFFF",

  // 🍫 Earth tones
  "#8B4513", "#A0522D", "#D2691E", "#CD853F", "#F4A460", "#DEB887",

  // 🌸 Pastels (for when you wanna pretend you're soft)
  "#FFB6C1", "#FFDAB9", "#E6E6FA", "#E0FFFF", "#F0FFF0", "#FFFACD",

  // 🌌 Dark and moody
  "#2F4F4F", "#4B0082", "#191970", "#00008B", "#8B0000",

  // 🦄 Absurd neons
  "#39FF14", "#FF073A", "#DA00FF", "#00FFD1", "#FFE700", "#FF6EC7",

  // 🌈 Grayscale parade
  "#000000", "#222222", "#444444", "#666666", "#888888", "#AAAAAA", "#CCCCCC", "#EEEEEE", "#FFFFFF",

  // 🎨 Original chaos (your old palette)
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
  "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
  "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
  "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF",

  // 🧨 Bonus randomness because why not
  "#FFC0CB", "#FFA07A", "#20B2AA", "#778899", "#B0C4DE", "#FFFFE0", "#00FA9A", "#B22222"
];


  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [selectedColor, setSelectedColor] = useState()
  const { resumeId } = useParams()
  const onColorSelect = (color) => {
    setSelectedColor(color)
    setResumeInfo({
      ...resumeInfo,
      themeColor: color
    })
    const data = {
      data: {
        themeColor: color
      }
    }
    api.updateResume(resumeId, data).then(resp => {
      toast('Theme Color Updated')
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
        <div className='grid grid-cols-5 gap-3'>
          {colors.map((item, index) => (
            <div
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${selectedColor == item && 'border border-black'}`}
              style={{ background: item }}
            >
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor