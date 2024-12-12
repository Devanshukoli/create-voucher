import VoucherForm from '@/components/VoucherForm'

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Travel Voucher Creation</h1>
      <VoucherForm />
    </main>
  )
}

