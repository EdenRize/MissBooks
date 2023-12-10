const { useState, useEffect } = React

export function LongTxt({txt, length = 100}) {
    const [isShowAll, setIsShowAll] = useState(false)

    function getTxt() {
        if(txt.length <= length) return <p>{txt}</p>

        if(isShowAll){
            return <React.Fragment>
                    <p>{txt}</p>
                    <a onClick={() => setIsShowAll(false)}>Read Less</a>
                    </React.Fragment>
        }
        
        return <p>{txt.substring(0, length)}... <a onClick={() => setIsShowAll(true)}>Read More</a></p>
    }

  return (
    <section className="long-txt">
        {getTxt()}
    </section>
  )
}
