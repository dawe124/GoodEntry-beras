import { emojis } from './emojis'
import { tickers } from './tickers'

export const stringSwapper = (origString) => {
    
    const filterEmojis = emojis.filter(origString)

      const filterTickers = filterEmojis.props.children.map(text =>
        tickers.filter(text)
      );

      return filterTickers
}