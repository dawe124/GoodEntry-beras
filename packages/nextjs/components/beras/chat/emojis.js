import reactStringReplace from 'react-string-replace';
import Image from "next/image";

const emojisList = ["kek", "kekwait", "harold", "thinkaboutitmm", "unicornmm", "pikachu", "cyanidejamm", "catjamm", "dogscaredmm", "zoomer", "smug", "tired", "boomer", "bloomer", "braindead", "chad", "doomer", "feelsokayman", "monka", "peepolove", "monkastop", "pepehands", "copium", "feelsspecialman", "monkahm", "peepoclown", "pepejamm", "poggies"];

// emojis ending with mm are animated
const emojisPath = (name) => {
  return "/emojis/" + name + (name.indexOf("mm") == name.length -2 ? ".gif" : ".png")
}

const emojisFilter = (msg) => {
  return <>
  {
    reactStringReplace(msg, /(:[a-z]+:)/g, (match, i) => {
      return(<Image key={i} src={emojis.path(match.replace(/:/g,""))} alt={match} height={28} width={28} className="px-1 inline-block" />)
    })
  }
  </>
}

export const emojis = {
  list: emojisList, 
  filter: emojisFilter,
  path: emojisPath
}