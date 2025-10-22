'use client'

import { useState } from 'react'
import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

const Inputoption = ({ label = "Label", options = [], value, onChange }) => {
    const [internalValue, setInternalValue] = useState(options[0] || null)

    // Tentukan apakah controlled (dari parent) atau pakai state lokal
    const selected = value !== undefined ? value : internalValue
    const handleChange = (val) => {
        if (onChange) onChange(val)
        setInternalValue(val)
    }

    return (
        <div className="w-full">
            <Listbox value={selected} onChange={handleChange}>
                <Label className="block mb-2 text-sm font-medium text-white">
                    {label}
                </Label>

                <div className="relative">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-stone-950 py-2 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:text-sm">
                        <span className="block truncate">{selected?.name || 'Pilih opsi'}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </ListboxButton>

                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-green-950 py-1 text-base ring-1 ring-white/10 focus:outline-none sm:text-sm">
                        {options.map((item) => (
                            <ListboxOption
                                key={item.id}
                                value={item}
                                className={({ focus }) =>
                                    `relative cursor-default select-none py-2 pl-3 pr-9 text-white ${focus ? 'bg-green-900' : ''
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-semibold' : 'font-normal'
                                                }`}
                                        >
                                            {item.name}
                                        </span>
                                        {selected && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </div>
    )
}

export default Inputoption
