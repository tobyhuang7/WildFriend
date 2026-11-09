import React from 'react';
import { Award, CheckSquare, HeartHandshake, Square } from 'lucide-react';
import { calculateFriendProgress } from '../utils/wildlifeResolver';

interface ConservationFriendCardProps {
  commonName: string;
  introEmpathyLine: string;
  actions: [string, string, string];
  badgeTitle: string;
  checkedState: boolean[];
  onToggleAction: (index: number) => void;
}

export const ConservationFriendCard: React.FC<ConservationFriendCardProps> = ({
  commonName,
  introEmpathyLine,
  actions,
  badgeTitle,
  checkedState,
  onToggleAction,
}) => {
  const { completedCount, totalCount, isCertified, progressPercent } =
    calculateFriendProgress(checkedState);

  return (
    <section
      data-testid="conservation-friend-card"
      className="tactile-card rounded-3xl p-6 bg-[#FFFDF7] flex flex-col justify-between space-y-5"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F]">
            <HeartHandshake className="w-4 h-4" />
            <span>Ranger Action Checklist</span>
          </div>
          <span className="text-xs font-extrabold tabular-nums text-[#1E2F23]">
            {completedCount} of {totalCount} Completed ({progressPercent}%)
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E2F23] tracking-tight">
          How to Be a Good Friend to {commonName}
        </h3>

        <p className="text-sm text-[#38513E] font-medium leading-relaxed bg-[#E9F5EC] border-2 border-[#1E2F23] rounded-2xl p-3.5">
          {introEmpathyLine}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-[#E9F5EC] rounded-full border-2 border-[#1E2F23] overflow-hidden">
          <div
            className="h-full bg-[#2D6A4F] transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 3 Actionable Checkboxes */}
        <div className="space-y-2.5 pt-1">
          {actions.map((actionText, idx) => {
            const isChecked = Boolean(checkedState[idx]);
            return (
              <button
                key={idx}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => onToggleAction(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 border-[#1E2F23] transition-transform flex items-start gap-3 cursor-pointer ${
                  isChecked
                    ? 'bg-[#D8F3DC] text-[#1E2F23]'
                    : 'bg-white hover:bg-[#FAF6EC] text-[#1E2F23]'
                }`}
              >
                <span className="mt-0.5 shrink-0 text-[#2D6A4F]">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 fill-[#2D6A4F] text-white" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </span>
                <span
                  className={`text-sm font-bold leading-snug ${
                    isChecked ? 'line-through decoration-2 text-[#2D6A4F]' : ''
                  }`}
                >
                  {actionText}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Certified Friend Badge Unlock Banner */}
      <div
        data-testid="certified-friend-badge"
        data-certified={isCertified ? 'true' : 'false'}
        className={`rounded-2xl p-4 border-3 border-[#1E2F23] transition-all flex items-center gap-3.5 ${
          isCertified ? 'bg-[#FFE066]' : 'bg-[#FAF6EC] opacity-85'
        }`}
      >
        <div
          className={`p-3 rounded-2xl border-2 border-[#1E2F23] shrink-0 ${
            isCertified ? 'bg-[#2D6A4F] text-[#FFE066]' : 'bg-white text-[#38513E]'
          }`}
        >
          <Award className="w-7 h-7" />
        </div>
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E2F23]">
            {isCertified ? 'Official Ranger Honor Unlocked!' : 'Check all 3 boxes to earn:'}
          </div>
          <div className="text-base sm:text-lg font-extrabold text-[#1E2F23]">
            {badgeTitle}
          </div>
          {isCertified && (
            <p className="text-xs font-semibold text-[#1E2F23] mt-0.5">
              Hooray! You know just how to help {commonName} thrive in the wild!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
