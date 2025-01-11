import { TrapCard } from "../../dsl/language/generated/ast";
import { SpellCard } from "../../dsl/language/generated/ast";
import { BaseCard, MonsterCard } from "../../dsl/language/generated/ast";
import { MonsterCardComponent } from "./MonsterCard";
import { SpellCardComponent } from "./SpellCard";
import { TrapCardComponent } from "./TrapCard";


export const isMonsterCard = (card: BaseCard): card is MonsterCard => {
    return card.$type === "MonsterCard";
};

export const isSpellCard = (card: BaseCard): card is SpellCard => {
    return card.$type === "SpellCard";
};

export const isTrapCard = (card: BaseCard): card is TrapCard => {
    return card.$type === "TrapCard";
}; 

type CardProps = {
    card: BaseCard;
};

/**
 * Card component that renders the appropriate card type based on the card data
 */
export const Card: React.FC<CardProps> = ({ card }) => {
    return (
        <div className="h-full w-full items-center justify-center flex">
            {isMonsterCard(card) && <MonsterCardComponent card={card} />}
            {isSpellCard(card) && <SpellCardComponent card={card} />}
            {isTrapCard(card) && <TrapCardComponent card={card} />}
        </div>
    );
};
