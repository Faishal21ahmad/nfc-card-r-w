'use client'
import { useState, useEffect } from "react"
import Link from 'next/link'
import Button from "@/components/Elements/Button"
import Inputoption from "@/components/Elements/Input/inputoption"
import Input from "@/components/Elements/Input/input"
import Textarea from "@/components/Elements/Input/input-textarea"
import Navigasi from "@/components/Elements/Navigasi/index"
import LayoutNav from "@/components/Elements/Navigasi/layout-nav"
import useBeepSound from '@/hooks/useBeepSound'

export default function WritePage() {
    const [data, setData] = useState('') // untuk input biasa
    const [status, setStatus] = useState('')
    const { soundBeep } = useBeepSound()

    // Record Type dan Media Type
    const recordtype = [
        { id: 1, name: 'text', value: 'text' },
        { id: 2, name: 'url', value: 'url' },
        { id: 3, name: 'absolute-url', value: 'absolute-url' },
        { id: 4, name: 'mime', value: 'mime' },
    ]
    const [selectedrecordtype, setSelectedrecordtype] = useState(recordtype[0])

    const mediatype = [
        { id: 1, name: 'null', value: null },
        { id: 2, name: 'application/json', value: 'application/json' },
    ]
    const [selectedmediatype, setSelectedmediatype] = useState(mediatype[0])

    // Auto-set mediaType ke JSON jika recordType = mime
    useEffect(() => {
        const { value } = selectedrecordtype
        setStatus(['url', 'absolute-url'].includes(value) ?
            "URL Harus diawali dengan http:// atau https://" : "")
        setSelectedmediatype(mediatype[value === "mime" ? 1 : 0])
    }, [selectedrecordtype])


    // Tulis data ke NFC
    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('Menunggu NFC... dekatkan tag ke perangkat.')

        if (!('NDEFReader' in window)) {
            setStatus("Browser tidak mendukung Web NFC")
            return
        }
        try {
            const ndef = new NDEFReader();
            const value = e.target.data.value.trim();

            // Validasi jika tipe URL
            if (['url', 'absolute-url'].includes(selectedrecordtype.value) && !/^https?:\/\//i.test(value)) {
                setStatus("URL tidak valid. Harus diawali dengan http:// atau https://")
                return
            }

            // Siapkan data record sesuai tipe
            let record = {
                recordType: selectedrecordtype.value,
                data: value,
            };

            // Jika MIME + JSON, encode dengan TextEncoder
            if (selectedrecordtype.value === 'mime' && selectedmediatype.value === 'application/json') {
                record = {
                    recordType: 'mime',
                    mediaType: 'application/json',
                    data: new TextEncoder().encode(value),
                };
            }

            await ndef.write({ records: [record] });
            soundBeep()
            setTimeout(() => {
                setStatus('Data berhasil ditulis ke NFC!');
            }, 1000)
        } catch (err) {
            soundBeep()
            setTimeout(() => {
                setStatus('Gagal menulis, Periksa apakah kartu NFC terkunci ?');
            }, 1000)
        }
    }

    return (
        <main className="flex flex-col min-h-screen w-full bg-black">
            <LayoutNav>
                <Navigasi title="Read" to="/read" className="bg-green-900 hover:bg-green-950 text-white" />
                <Navigasi title="Back" to="/" className="bg-red-700 hover:bg-red-800 text-white" />
            </LayoutNav>

            <section className="w-full md:mt-16 flex flex-col items-center flex-grow p-3">
                <div className="w-full md:p-3 ">
                    <h1 className="text-2xl text-center font-semibold mb-6 mt-3">Write NFC Card</h1>
                    <div className="w-full items-center flex-col md:flex gap-4 ">
                        <form onSubmit={handleSubmit} className="space-y-3 w-full md:max-w-1/2" >
                            <Inputoption
                                label="Record Type"
                                options={recordtype}
                                value={selectedrecordtype}
                                onChange={setSelectedrecordtype}
                            />
                            <Inputoption
                                label="Media Type"
                                options={mediatype}
                                value={selectedmediatype}
                                onChange={setSelectedmediatype}
                            />

                            {/* Kondisi Input Berdasarkan MediaType */}
                            {selectedmediatype.value === 'application/json' ? (
                                <Textarea
                                    label="Data (JSON)"
                                    name="data"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    placeholder={
                                        `{
    342"title": "Kartu Nama",
    "name": "ixal",
    "link": "https://ixal.my.id"
}`
                                    } />
                            ) : (
                                <Input
                                    label="Data"
                                    type="text"
                                    name="data"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    placeholder="Tulis data teks atau URL di sini"
                                />
                            )}
                            <Button type="submit" className="mt-3 bg-green-900 hover:bg-green-950 ">
                                Tulis ke NFC
                            </Button>
                        </form>
                        <p className="mt-4">{status}</p>
                        <p className="text-gray-500 text-sm mt-2">
                            Note: Browser akan meminta izin NFC. Pastikan NFC aktif dan perangkat mendukung Web NFC.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
