'use client'
import { useEffect, useState } from 'react'
import Navigasi from "@/components/Elements/Navigasi/index"
import LayoutNav from "@/components/Elements/Navigasi/layout-nav"
import useBeepSound from '@/hooks/useBeepSound'

export default function ReadPage() {
    const [message, setMessage] = useState(`Klik "Mulai Scan" dan tempelkan kartu NFC`)
    const [scanning, setScanning] = useState(false)
    const { soundBeep } = useBeepSound()

    const startScan = async () => {
        if (!('NDEFReader' in window)) {
            setMessage('Web NFC tidak didukung di browser ini')
            return
        }

        try {
            const ndef = new NDEFReader()
            setMessage('Meminta izin scan — silakan izinkan dan tempelkan kartu')
            setScanning(true)

            await ndef.scan()

            ndef.onreadingerror = () => {
                soundBeep()
                setTimeout(() => {
                    setMessage('Gagal membaca tag — coba dekatkan lagi')
                }, 1000)
            }

            ndef.onreading = (event) => {
                try {
                    const records = event.message.records;

                    if (!records || records.length === 0) {
                        soundBeep()
                        setTimeout(() => {
                            setMessage("Tag kosong atau format tidak dikenal");
                        }, 1000)
                        return;
                    }

                    const decoder = new TextDecoder();
                    const allRecords = [];

                    for (const record of records) {
                        let value = null;

                        // Decode data sesuai jenis recordType
                        if (record.recordType === "text" || record.recordType === "url") {
                            value = decoder.decode(record.data);
                        } else if (record.recordType === "mime") {
                            const mimeText = decoder.decode(record.data);
                            try {
                                value = JSON.parse(mimeText);
                            } catch {
                                value = mimeText; // fallback jika bukan JSON
                            }
                        } else {
                            // Untuk recordType lain (smart-poster, unknown, dll)
                            value = decoder.decode(record.data || new Uint8Array());
                        }

                        allRecords.push({
                            recordType: record.recordType,
                            mediaType: record.mediaType || null,
                            data: value,
                        });
                    }
                    soundBeep()
                    // Tampilkan semua record
                    setTimeout(() => {
                        setMessage("Terbaca:\n" + JSON.stringify(allRecords, null, 1));
                    }, 1000)

                    setScanning(false);
                } catch (err) {
                    // console.error(err);
                    soundBeep()
                    setTimeout(() => {
                        setMessage("Error saat memproses tag: " + err.message);
                    }, 1000)
                    setScanning(false);
                }
            };

        } catch (err) {
            console.error(err)
            soundBeep()
            setTimeout(() => {
                setMessage('Gagal memulai scan: ' + (err?.message || err))
            }, 1000)
            setScanning(false)
        }
    }

    return (
        <main className="flex flex-col min-h-screen w-full bg-black">
            <LayoutNav>
                <Navigasi title="Write" to="/write" className="bg-green-900 hover:bg-green-950 text-white" />
                <Navigasi title="Back" to="/" className="bg-red-700 hover:bg-red-800 text-white" />
            </LayoutNav>

            <section className="w-full md:mt-16 flex flex-col items-center flex-grow p-3">
                <div className="w-full md:p-3 ">
                    <h1 className="text-2xl text-center font-semibold mb-6 mt-3">
                        Read NFC Card
                    </h1>

                    <div className="w-full flex-row md:flex gap-4 ">
                        <div className="w-full md:w-1/4 mt-4 md:mt-0 text-center flex">
                            <button className='p-4 h-14 text-white font-semibold cursor-pointer bg-green-900 hover:bg-green-950 rounded-md w-full' onClick={startScan} disabled={scanning}>Mulai Scan</button>
                        </div>
                        <div className="w-full md:w-3/4 mt-4 md:mt-0 bg-stone-950">
                            <pre className='border border-gray-300 rounded-md p-4 whitespace-pre-wrap break-words'>{message}</pre>
                            <p className='absolute p-4'>Pastikan halaman dalam keadaan aktif, dan Chrome (Android) mendukung Web NFC.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}