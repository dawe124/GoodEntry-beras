import reactStringReplace from 'react-string-replace';

const cultWordsList = ["pepetuals", "retardo"];

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
    reactStringReplace(getMsg, /(pepetuals|retardo)/g, (match) => {
      // console.log(match)
      if (cultWordsPath(msg) !== undefined && match == 'pepetuals') {
        // return(<span key={i} className="px-1 newest-trade">{cultWordsPath(match)}</span>)
        return msg
      } else if (cultWordsPath(msg) !== undefined && match == 'retardo') {
        // return(<span key={i} className="px-1 text-red-300 oonga-boonga">{cultWordsPath(match)}</span>)
        return msg
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