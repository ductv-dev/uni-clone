"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TWallet } from "@/types";
import { Copy, Wallet2, ArrowDownLeft, ArrowUpRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { shortenHex } from "@/lib/utils";
import { useState } from "react";

type Props = {
    data: TWallet;
}

export const SectionMyWallet = ({ data }: Props) => {
    const totalBalance = data?.tokens?.reduce((acc, item) => acc + (item.amount * item.usdValue), 0) || 0;
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Đã sao chép địa chỉ ví");
    }
    const [isHide, setIsHide] = useState(false)
    const walletAddress = shortenHex(data.address)
    return (
        <div className="w-full p-2.5 flex flex-col lg:flex-row gap-2.5">
            {/* Wallet  */}
            <div className="lg:w-1/3 w-full">
                <Card className="h-full">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center text-lg font-semibold">
                            <span className="flex items-center gap-2">
                                <Wallet2 className="w-5 h-5 text-primary" />
                                {data.name}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-secondary/30 rounded-xl p-4 mb-6 border border-secondary">
                            <p className="text-sm text-muted-foreground mb-1">Tổng tài sản</p>
                            <div className="flex items-end gap-2">
                                <button onClick={() => setIsHide(!isHide)} className=" ">
                                    <h2 className="text-3xl font-bold tracking-tight">
                                        {isHide ? "******" : totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </h2>
                                </button>
                                <span className="text-sm font-medium text-muted-foreground mb-1">USDT</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-medium">Địa chỉ ví</p>
                            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border">
                                <span className="text-sm text-muted-foreground font-mono truncate mr-2">
                                    {walletAddress}
                                </span>
                                <Button onClick={() => copyToClipboard(data.address)} variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-6">
                            <Button className="flex-1 gap-2" variant="default">
                                <ArrowDownLeft className="h-4 w-4" /> Nhận
                            </Button>
                            <Button className="flex-1 gap-2" variant="outline">
                                <ArrowUpRight className="h-4 w-4" /> Gửi
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Token List  */}
            <div className="lg:w-2/3 w-full">
                <Card className="h-full">
                    <CardHeader className="pb-4 border-b mb-4">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Tài sản ({data.tokens?.length || 0})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.tokens && data.tokens.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {data.tokens.map((item) => {
                                    const itemTotal = item.amount * item.usdValue;
                                    return (
                                        <div key={item.symbol} className="flex items-center justify-between p-3 hover:bg-secondary/20 rounded-lg transition-colors border border-transparent hover:border-secondary cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 relative overflow-hidden rounded-full bg-secondary/50 flex items-center justify-center shadow-sm">
                                                    {item.logoURI ? (
                                                        // Using standard img tag if strict Next/Image domain is not configured yet
                                                        <img src={item.logoURI} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="font-bold text-xs">{item.symbol.substring(0, 2)}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm">{item.name}</span>
                                                    <span className="text-xs text-muted-foreground">{item.symbol}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="font-medium text-sm">
                                                    ${itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {item.amount.toLocaleString(undefined, { maximumFractionDigits: 4 })} {item.symbol}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                                <Activity className="w-10 h-10 mb-3 opacity-20" />
                                <p className="text-sm">Chưa có tài sản nào</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
