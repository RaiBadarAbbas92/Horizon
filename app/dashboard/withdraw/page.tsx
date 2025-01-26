import { WithdrawForm } from './withdraw-form'
import { WithdrawHistory } from './withdraw-history'
import {Header} from "@/components/header"

export default function WithdrawPage() {
  return (
    <>
    <Header/>
    <div className="space-y-8">
      <WithdrawForm />
      <WithdrawHistory />
    </div></>
  )
}

