export type { TUser } from "./type-user"
export type { TWallet, TTokenBalance } from "./type-wallet"
export type {
  TTransaction,
  TTransactionType,
  TTransactionStatus,
} from "./type-transaction"
export type { TToken } from "./type-token"

// Shared nav type — dùng chung cho cả mobile và desktop navbar
export type TNavItem = {
  label: string
  href: string
  icon: React.ReactNode
}
