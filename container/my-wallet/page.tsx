"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@/store/user-store"
import { TUser, TWallet } from "@/types"
import { AddNewWallet } from "./sections/add-new-wallet"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { SectionMyWallet } from "./sections/section-my-wallet"
import { HeaderMyWallet } from "./sections/header-my-wallet"

export const MyWallet = () => {
    const user = useUser((state: { user: TUser }) => state.user)
    const wallet = user?.wallet
    const [walletSelected, setWalletSelected] = useState<TWallet | undefined>(wallet?.[0])

    useEffect(() => {
        if (!walletSelected && wallet && wallet.length > 0) {
            setWalletSelected(wallet[0])
        }
    }, [wallet, walletSelected])

    return (
        <div className="min-h-screen ">
            <HeaderMyWallet />
            {
                wallet && wallet.length > 0 ? (
                    <div className="">
                        <Select
                            value={walletSelected?.address}
                            onValueChange={(val) => {
                                const selected = wallet.find(w => w.address === val)
                                setWalletSelected(selected)
                            }}
                        >
                            <SelectTrigger className="bg-primary text-primary-foreground px-4 py-2 w-[200px] font-semibold">
                                <SelectValue placeholder="Select a wallet" />
                            </SelectTrigger>
                            <SelectGroup>
                                <SelectContent>
                                    <div className="flex flex-col gap-2">
                                        {
                                            wallet.map((item) => (
                                                <SelectItem key={item.address} value={item.address}>
                                                    {item.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </div>
                                </SelectContent>
                            </SelectGroup>
                        </Select>

                        <SectionMyWallet data={walletSelected ? walletSelected : wallet[0]} />
                    </div>
                ) : (
                    <div className="mt-20">
                        <AddNewWallet />
                    </div>
                )
            }
        </div>
    )
}