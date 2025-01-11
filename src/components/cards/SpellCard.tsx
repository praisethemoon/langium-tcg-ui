import React from "react";

import spellDark from "../../assets/game/types/dark.png";
import spellEarth from "../../assets/game/types/earth.png";
import spellFire from "../../assets/game/types/fire.png";
import spellLight from "../../assets/game/types/light.png";
import spellWater from "../../assets/game/types/water.png";
import spellWind from "../../assets/game/types/wind.png";
import { SpellCard } from "../../dsl/language/generated/ast";

interface SpellCardProps {
    card: SpellCard;
}

const typeIcons: Record<string, string> = {
    dark: spellDark,
    earth: spellEarth,
    fire: spellFire,
    light: spellLight,
    water: spellWater,
    wind: spellWind,
};

/**
 * Spell Card component for displaying spell cards
 * @param props.card - Spell card data
 */
export const SpellCardComponent: React.FC<SpellCardProps> = ({ card }) => {
    return (
        <div className="card-base bg-red-500 rounded-md">
            <div className="card-header">
                <h4 className="card-title">{card.name}</h4>
                {typeIcons[card.category] && (
                    <img 
                        width={16}
                        src={typeIcons[card.category]} 
                        alt={card.category}
                        className="card-type-icon"
                        draggable={false}
                    />
                )}
            </div>

            <div className="flex items-center text-md gap-[2px] justify-end">
                <span className="bg-primary rounded-md">Spell</span>
            </div>
            
            <div className="card-image-container">
                <img 
                    src={card.artwork} 
                    alt={card.name}
                    className="card-image"
                    loading="lazy"
                    draggable={false}
                />
            </div>

            <div className="card-description">
                {card.description}
            </div>
        </div>
    );
};
