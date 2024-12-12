'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import VoucherForm from '@/components/VoucherForm'
import { Button } from "@/components/ui/button"
import { useVoucher } from '@/context/VoucherContext'
import { generatePDF, generateDOCX } from '@/utils/documentGeneration'

export default function EditVoucher() {
  const { voucherData, setVoucherData, isLoading, setIsLoading, error, setError } = useVoucher()
  const searchParams = useSearchParams()
  const voucherId = searchParams.get('id')

  useEffect(() => {
    const fetchVoucherData = async () => {
      if (voucherId) {
        setIsLoading(true)
        setError(null)
        try {
          // Simulating API call
          const response = await new Promise(resolve => setTimeout(() => resolve({
            // Sample data structure
            guestName: 'John Doe',
            adults: 2,
            children: 1,
            childrenAges: '10',
            // ... other fields ...
          }), 1000))
          setVoucherData(prevData => ({ ...prevData, ...response }))
        } catch (err) {
          setError('Failed to fetch voucher data')
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchVoucherData()
  }, [voucherId, setVoucherData, setIsLoading, setError])

  const handleDownloadPDF = () => {
    if (voucherData) {
      generatePDF(voucherData)
    }
  }

  const handleDownloadDOCX = () => {
    if (voucherData) {
      generateDOCX(voucherData)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Travel Voucher</h1>
      <VoucherForm />
      <div className="mt-8 flex justify-center space-x-4">
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
        <Button onClick={handleDownloadDOCX}>Download DOCX</Button>
      </div>
    </div>
  )
}
