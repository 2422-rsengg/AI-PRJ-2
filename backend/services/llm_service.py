"""
Professional Analytics and Simulation Engine.
Analyzes backend payload keys to generate realistic, data-driven insurance
renewal strategies and communication drafts tailored to specific customer profiles.
"""

class LLMService:
    def __init__(self):
        print("DEBUG: Underwriting Simulation Engine active.")

    def generate_recommendation(self, data: dict) -> dict:
        """
        Parses policyholder metrics dynamically to return custom underwriting 
        assessments and professional email notifications.
        """
        # Print payload to server logs for development validation
        print(f"DEBUG: Input payload received: {data}")
        
        # 1. Adapt to varying frontend payload structures
        name = data.get("policyholder_name") or data.get("name") or data.get("customer") or data.get("customer_name") or "Policyholder"
        policy_type = data.get("policy_type") or data.get("type") or "Standard Line"
        
        # Extract and normalize premium data fields
        raw_premium = data.get("current_premium") or data.get("premium") or data.get("salary") or 1200
        try:
            base_premium = float(str(raw_premium).replace('$', '').replace(',', ''))
            # Scale down to an expected insurance premium baseline if salary data is passed instead
            if base_premium > 25000:
                base_premium = round(base_premium * 0.025, 2)
        except ValueError:
            base_premium = 1200.0

        # Handle variations of claim entries
        claims_count = data.get("claims_count") or data.get("claims") or 0
        try:
            claims_count = int(claims_count)
        except ValueError:
            claims_count = 0

        # Parse user account or workflow status
        status = str(data.get("status") or "").upper()
        if not status:
            status = "PENDING" if claims_count > 0 else "ACTIVE"

        # 2. Underwriting evaluation and matrix selection
        if status == "ACTIVE" and claims_count == 0:
            optimized_premium = round(base_premium * 0.88, 2)  # 12% Preferred account rate
            strategy_title = "Preferred Account Renewal Strategy"
            tier_desc = "Low-Risk Loyalty Tier"
            modifications = (
                f"- Premium Adjustment: Decreased from ${base_premium:,.2f} to ${optimized_premium:,.2f} based on a clean claims history.\n"
                f"- Deductible Structure: Retained current baseline caps without standard rate inflation.\n"
                f"- Coverage Extensions: Included complimentary roadside indemnity and minor glass damage protection waivers."
            )
            action_plan = "Approve preferred renewal pricing allocation to lock in current loyalty rate structures prior to policy expiration."
            email_body = (
                "Thank you for maintaining an exceptional safety record over the past policy term. "
                "In appreciation of your claim-free status, our underwriting team has applied a preferred credit "
                "to your upcoming policy configuration, resulting in a direct premium reduction."
            )

        elif status == "PENDING" or claims_count > 0:
            optimized_premium = round(base_premium * 1.06, 2)  # 6% Risk exposure restructuring
            strategy_title = "Risk Mitigation and Premium Restructuring Strategy"
            tier_desc = "Standard Modified Risk Tier"
            modifications = (
                f"- Premium Adjustment: Adjusted baseline to ${optimized_premium:,.2f} to balance increased risk parameters from recent claim actions.\n"
                f"- Deductible Structure: Modified voluntary out-of-pocket thresholds by 5% to reduce fixed premium escalation.\n"
                f"- Liability Safeguards: Maintained core comprehensive limits to ensure full exposure protection."
            )
            action_plan = "Execute policy restructuring protocol to avoid coverage gaps or lapse in mandatory liability protections."
            email_body = (
                "Following a routine review of your active coverage lines and historical claim data, our risk management "
                "team has updated your policy classification. This structural adjustment balances your current premium outlays "
                "with active market risk values to maintain your comprehensive protection plan."
            )

        else:
            # Baseline market indexing option
            optimized_premium = round(base_premium * 1.02, 2)  # 2% standard index adjustment
            strategy_title = "Standard Line Item Review and Renewal"
            tier_desc = "Baseline Rate Classification"
            modifications = f"- Premium Adjustment: Standard indexing adjustment applied, transitioning from ${base_premium:,.2f} to ${optimized_premium:,.2f}."
            action_plan = "Process standard contract renewal options to guarantee continuous policy coverage schedules."
            email_body = (
                "Your routine coverage evaluations are complete. We have outlined a balanced renewal layout designed to keep "
                "your mandatory protection profiles functional and inline with standard regional adjustments."
            )

        # 3. Compile formal corporate markdown content layouts
        recommendation_markdown = (
            f"### {strategy_title}\n"
            f"Account Review For: {name} | Classification Profile: {tier_desc}\n\n"
            f"--- \n\n"
            f"#### 1. Underwriting Review\n"
            f"An analysis of active risk metrics has been finalized for your current {policy_type} policy framework. "
            f"To achieve appropriate coverage health, this portfolio has been aligned with optimized risk allocation tiers.\n\n"
            f"#### 2. Itemized Coverage Revisions\n"
            f"{modifications}\n\n"
            f"#### 3. Agent Advisory Action Item\n"
            f"Recommended Next Step: {action_plan}"
        )
        
        communication_draft = (
            f"Subject: Policy Renewal Notice: Review Coverage Options for {name}\n\n"
            f"Dear {name},\n\n"
            f"{email_body}\n\n"
            f"Your previous cycle baseline premium was ${base_premium:,.2f}. Based on updated policy variables, your target "
            f"renewal option is structured at ${optimized_premium:,.2f} annually. This modification secures your underlying asset parameters "
            f"while matching professional safety thresholds.\n\n"
            f"Please log into your client portal account dashboard to view these terms or complete your formal authorization paperwork.\n\n"
            f"Sincerely,\n\n"
            f"Underwriting Advisory Services\n"
            f"Automated Insurance Solutions Platform"
        )
        
        return {
            "recommendation": recommendation_markdown,
            "communication_draft": communication_draft
        }