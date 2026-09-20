import { useId, useState, type KeyboardEvent } from 'react'
import { IconButton, Input } from '../design-system'

export interface Suggestion {
  text: string
  kind: 'Recipe' | 'Ingredient'
}

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  suggestions: Suggestion[]
  placeholder?: string
}

export function SearchBox({ value, onChange, suggestions, placeholder }: SearchBoxProps) {
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const showList = open && suggestions.length > 0 && value.trim().length > 0

  const update = (next: string) => {
    onChange(next)
    setActive(-1)
    setOpen(true)
  }

  const choose = (text: string) => {
    onChange(text)
    setActive(-1)
    setOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      // Results already update while typing — Enter confirms a highlighted
      // suggestion, otherwise it just closes the list.
      if (showList && active >= 0) choose(suggestions[active].text)
      else setOpen(false)
      e.preventDefault()
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <Input
        iconLeft="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => update(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        enterKeyHint="search"
        role="combobox"
        aria-label="Search recipes"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
      />
      {value && (
        <IconButton
          icon="x"
          variant="plain"
          size="s"
          label="Clear search"
          onClick={() => {
            onChange('')
            setOpen(false)
          }}
          style={{ position: 'absolute', right: 6, top: 6 }}
        />
      )}
      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 z-30 m-0 p-1 list-none"
          style={{
            top: 'calc(100% + 6px)',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-field)',
            boxShadow: 'var(--shadow-m)',
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={`${s.kind}-${s.text}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(s.text)}
              onMouseEnter={() => setActive(i)}
              className="flex items-center justify-between gap-3 cursor-pointer"
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-s)',
                background: i === active ? 'var(--cream-2)' : 'transparent',
                fontSize: 'var(--size-body-m)',
                color: 'var(--text-body)',
              }}
            >
              <span>{s.text}</span>
              <span style={{ fontSize: 'var(--size-label)', color: 'var(--text-subtle)' }}>{s.kind}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
