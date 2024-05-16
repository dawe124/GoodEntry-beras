import reactStringReplace from 'react-string-replace';

const cultWordsList = ["oonga boonga", "viva las beras"];

const cultWordsPath = (word) => {
  if (typeof word !== 'string') {
      return word;
  }

  const capitalizedWord = word.toUpperCase();
  return capitalizedWord;
}

const cultWordsFilter = (msg) => {
  const getMsg = msg.props.children.props.children
  return <>
  {
    reactStringReplace(getMsg, /(viva las beras|ooga booga)/g, (match, i) => {
      // console.log(match)
      if (cultWordsPath(msg) !== undefined && match == 'viva las beras') {
        return(<span key={i} className="px-1 newest-trade">{cultWordsPath(match)}</span>)
      } else if (cultWordsPath(msg) !== undefined && match == 'ooga booga') {
        return(<span key={i} className="px-1 text-red-300 oonga-boonga">{cultWordsPath(match)}</span>)
      } else {
        return msg
      }

    })
  }
  </>
}

export const cultWords = {
  list: cultWordsList, 
  filter: cultWordsFilter,
  path: cultWordsPath
}