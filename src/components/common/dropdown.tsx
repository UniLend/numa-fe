import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import Image from "next/image";

interface DropdownProps<T> {
  options: T[];
  onSelect: (value: T) => void;
  renderOption: (option: T) => React.ReactNode;
  placeholder?: string;
  className?: string;
  selected: any;
  setSelected: (value: any) => void;
}

export default function Dropdown<T>({
  options,
  onSelect,
  renderOption,
  placeholder = "Select an option",
  className = "",
  selected,
  setSelected,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  // const [selected, setSelected] = useState<T | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;
    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev === 0 ? options.length - 1 : prev - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          const selectedOption = options[highlightedIndex];
          setSelected(selectedOption);
          onSelect(selectedOption);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`dropdown ${className}`}
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <button
        className='dropdownToggle'
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        {selected ? renderOption(selected) : placeholder}
        <Image
          className={`dropdownArrow ${isOpen ? "open" : ""}`}
          src='/images/arrow-down-white.svg'
          alt='Down arrow'
          width={12}
          height={12}
        />
      </button>
      {isOpen && (
        <ul className='dropdownMenu' role='listbox'>
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdownItem ${
                highlightedIndex === index ? "highlighted" : ""
              }`}
              role='option'
              aria-selected={selected === option}
              onClick={() => {
                setSelected(option);
                onSelect(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {renderOption(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
