// ከቴሌግራም ዌብ አፕ የተጫዋቹን ID ማግኘት
const tg = window.Telegram.WebApp;
const telegramId = tg.initDataUnsafe?.user?.id || 123456789; // ለሙከራ 123456789

// ተጫዋቹ ካርቴላዎችን መርጦ 'ይቆለፍ' ወይም ሰዓት ሲያልቅ የሚሰራ ፈንክሽን
async function lockAndPayCards(selectedCardsArray, stakeAmount) {
    const apiUrl = "https://your-api-domain.com";
    
    const requestData = {
        telegram_id: telegramId,
        selected_cards: selectedCardsArray, // ለምሳሌ [12, 450]
        stake_per_card: parseFloat(stakeAmount) // ለምሳሌ 50.0
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("🎉 " + result.message);
            // በፈረንትአንዱ ላይ የPlay Wallet እሴትን ማደስ
            document.getElementById("play-wallet-display").innerText = result.new_play_wallet + " ETB";
            return true;
        } else {
            alert("⚠️ ስህተት፡ " + result.detail);
            return false;
        }
    } catch (error) {
        console.error("ከባክኤንድ ጋር መገናኘት አልተቻለም:", error);
        return false;
    }
}
