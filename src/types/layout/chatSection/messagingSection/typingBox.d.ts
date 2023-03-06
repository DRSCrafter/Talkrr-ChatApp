import React from "react";

export default interface TypingBox {
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    onSend: React.FormEventHandler<HTMLFormElement>,
    onEmojiAdd: (emoji: any) => void
}