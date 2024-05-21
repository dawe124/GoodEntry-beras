import reactStringReplace from 'react-string-replace';

// const tickersList = {
//     "$PIGEON": {
//         "symbol": "PIGEON",
//         "address": "0x09a120d45caa062f462cf96dc6f4fb6c0ce958fb"
//     },
//     "$PARKBOYS": {
//         "symbol": "PARKBOYS",
//         "address": "0xbd72bccaca8681b188a195411b215f93134a3268"
//     },
//     "$LasBERAS": {
//         "symbol": "LasBERAS",
//         "address": "0x5161e16fac57cf6c45ddfe64c98ee738b2e6f674"
//     }
// }

const tickersFilter = (msg, tickersList) => {
    if (tickersList == {}) return <>{msg}</>
    const tickersPath = (name) => {
        if (tickersList[name]?.address !== undefined) {
            return "/token/" + tickersList[name]?.address
        } else {
            return undefined
        }
    }
  return <>
    {
        reactStringReplace(msg, /\$[A-Za-z]+/g, (match, i) => {
            if (tickersPath(msg) !== undefined) {
                return(<a key={i} href={tickersPath(msg)} className="px-1 ticker-highlight">{msg}</a>)
            } else {
                return <span key={i}>{msg}</span>
            }
        })
    }
  </>
}

export const tickers = {
    // list: tickersList, 
    filter: tickersFilter,
    // path: tickersPath
}