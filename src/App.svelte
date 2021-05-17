<script>
    const MAX_OMI_IN_RESERVE = 3.5e11;
    const MAX_OMI_ON_EXCHANGES = 3.5e11;

    let omiInReserve = MAX_OMI_IN_RESERVE;
    let omiOnExchanges = MAX_OMI_ON_EXCHANGES;

    let appStoreFee = 30;
    let buyBackRate = 10;

    let moneyToAppStore = 0;
    let moneyReservedBuybacks = 0;
    let moneySpentBuybacks = 0;
    let moneyVeVeLeftover = 0;
    let totalOmiBurnt = 0;

    let dropAmount = 20000000;
    let dropsPerWeek = 1;
    let omiPrice = .001;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let week = 0;

    function incrementWeek() {
        const totalDropAmount = dropAmount * dropsPerWeek;
        const tmpMoneyToAppStore = (appStoreFee/100) * totalDropAmount;
        moneyToAppStore += tmpMoneyToAppStore;
        const leftOver = totalDropAmount - tmpMoneyToAppStore;
        const tmpBuyBackAmt = leftOver * (buyBackRate/100);
        moneyReservedBuybacks += tmpBuyBackAmt;
        moneyVeVeLeftover += leftOver - tmpBuyBackAmt;
        week++;
        const tmpBurnt = totalDropAmount / omiPrice
        totalOmiBurnt += tmpBurnt;
        if(omiInReserve - tmpBurnt <= 0) {
            omiInReserve = 0
        } else {
            omiInReserve -= tmpBurnt;
        }
    }

    function doBuyback() {
        const amtToBuy = moneyReservedBuybacks / omiPrice;
        omiInReserve += amtToBuy;
        omiOnExchanges -= amtToBuy;
        moneyReservedBuybacks = 0;
    }
</script>

<div style="font-size: 36px;">
    WARNING! THIS IS NOT CURRENTLY REALISTIC. SECONDARY MARKET IS NOT ACCOUNTED FOR.
</div>

<div>OMI In Reserve: {numberWithCommas(omiInReserve)}</div>
<div style="width: 100%; height: 80px; border: 1px solid red;">
    <div class="box red" style="width: {100*omiInReserve/MAX_OMI_IN_RESERVE}%; height: 80px; background-color: red;"></div>
</div>

<div>OMI On Exchanges: {numberWithCommas(omiOnExchanges)}</div>
<div style="width: 100%; height: 80px; border: 1px solid red;">
    <div style="width: {100*omiOnExchanges/MAX_OMI_ON_EXCHANGES}%; height: 80px; background-color: red;"></div>
</div>

<div>Week: {week} (Years: {Math.floor(week/52)} Weeks: {week % 52})</div>
<div>Money Sent to App Store: ${numberWithCommas(moneyToAppStore)}</div>
<div>Money currently reserved for buybacks: ${numberWithCommas(moneyReservedBuybacks)}</div>
<div>Total money spent on buybacks: ${numberWithCommas(moneySpentBuybacks)}</div>
<div>Money Veve Leftover: ${numberWithCommas(moneyVeVeLeftover)}</div>
<div>Total Omi Burnt: ${numberWithCommas(totalOmiBurnt)}</div>



<div style="width: 100%; height: 32px; background: #333333"></div>



<h1>Menu</h1>
<label>App Store Fee: {appStoreFee}%</label>
<input type="range" min="0" max="100" step=".1" bind:value={appStoreFee}>

<label>Buyback: {buyBackRate}%</label>
<input type="range" min="0" max="100" step=".1" bind:value={buyBackRate}>

<label>Drop Amount: ${numberWithCommas(dropAmount)}</label>
<input type="number" min="0" bind:value={dropAmount}>

<label>Drops Per Week: {dropsPerWeek}</label>
<input type="number" min="0" bind:value={dropsPerWeek}>

<label>OMI Price: ${omiPrice}</label>
<input type="number" min="0" bind:value={omiPrice}>

<div>Buyback Savings Formula: Amount To Save = ((100 - appStoreFee)/100) * dropAmount * buybackRate</div>

<button on:click={incrementWeek}>Next Week</button>
<button on:click={doBuyback}>Buy Back</button>
