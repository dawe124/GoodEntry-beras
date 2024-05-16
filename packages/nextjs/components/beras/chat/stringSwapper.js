import { emojis } from './emojis'
import { tickers } from './tickers'
import { cultWords } from './cultWords'

export const stringSwapper = (origString) => {
    
    const filterEmojis = emojis.filter(origString)

      const filterTickers = filterEmojis.props.children.map((text, index) =>
        <span key={index}>{tickers.filter(text)}</span>
      );

      const filterCultWords = filterTickers.map((text, index) =>
        <span key={index}>{cultWords.filter(text)}</span>
      );

      return filterCultWords
}