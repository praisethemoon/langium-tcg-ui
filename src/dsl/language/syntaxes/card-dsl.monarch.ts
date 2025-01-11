// Monarch syntax highlighting for the card-dsl language.
export default {
    keywords: [
        '[effect]','abilities','ability','activate','active','and','artwork','attack','attacking','auto','battlefield','beast','by','cancel','cards','category','change','coin','construct','damaged','dark','death','deck','demon','description','destroy','discard','divine','dragon','draw','earth','effect','equal','fire','flip','for','from','gain','graveyard','hand','heal','healed','hp','id','increase','life','light','limit','loose','monster','name','of','on','opponent','opponents','or','passive','select','spectral','spell','spellcaster','spirit','stars','summon','target','the','this','to','traits','trap','trigger','type','undead','warrior','water','weaken','where','wind','your'
    ],
    operators: [
        '!=','$','*','+',',','-','.','/',':','<','<=','=','>','>='
    ],
    symbols: /!=|\$|\(|\)|\*|\+|,|-|\.|\/|:|<|<=|=|>|>=|\[|\]/,

    tokenizer: {
        initial: [
            { regex: /synthetic:indent/, action: {"token":"INDENT"} },
            { regex: /synthetic:dedent/, action: {"token":"DEDENT"} },
            { regex: /[_a-zA-Z][\w_-]*/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"ID"} }} },
            { regex: /[0-9]+/, action: {"token":"number"} },
            { regex: /"[^"]*"|'[^']*'/, action: {"token":"string"} },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /[\t ]+/, action: {"token":"white"} },
            { regex: /[\r\n]+/, action: {"token":"white"} },
            { regex: /\/\*/, action: {"token":"comment","next":"@comment"} },
            { regex: /\/\/[^\n\r]*|#[^\n\r]*/, action: {"token":"comment"} },
        ],
        comment: [
            { regex: /[^/\*]+/, action: {"token":"comment"} },
            { regex: /\*\//, action: {"token":"comment","next":"@pop"} },
            { regex: /[/\*]/, action: {"token":"comment"} },
        ],
    }
};
