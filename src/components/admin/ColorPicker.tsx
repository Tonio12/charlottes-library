import { HexColorInput, HexColorPicker } from 'react-colorful'

interface ColorPickerProps {
  value?: string
  onPickerChange?: (color: string) => void
}

const ColorPicker = ({ value, onPickerChange }: ColorPickerProps) => {
  return (
    <div className="relative">
      <div className="colour-picker">
        <HexColorPicker color={value} onChange={onPickerChange} />
        <div className="flex items-center ">
          <p>#</p>
          <HexColorInput
            color={value}
            onChange={onPickerChange}
            className="hex-input"
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
