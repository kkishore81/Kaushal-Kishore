
import { WillData } from '../types';

export const generateWillText = (data: WillData): string => {
    const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    const assetsByBeneficiary = data.beneficiaries.map(beneficiary => {
        const assignedAssets = data.assets.filter(asset => asset.beneficiaryId === beneficiary.id);
        if (assignedAssets.length === 0) return '';
        
        const assetList = assignedAssets.map(asset => `      - ${asset.description}`).join('\n');

        return `  TO: ${beneficiary.name} (${beneficiary.relationship}), I bequeath the following assets:\n${assetList}`;
    }).filter(Boolean).join('\n\n');
    
    const unassignedAssets = data.assets.filter(asset => !asset.beneficiaryId);
    const unassignedAssetsText = unassignedAssets.length > 0
        ? `The remainder of my estate, including any unassigned assets listed below, shall be given to ${data.beneficiaries[0]?.name || '[Primary Beneficiary Name]'}.\n` + unassignedAssets.map(asset => `      - ${asset.description}`).join('\n')
        : 'All my remaining assets and property shall be passed to my primary beneficiary.';


    return `
***DISCLAIMER: This document is a computer-generated draft and is not a legally binding will. It is intended for informational purposes only. You MUST consult with a qualified legal professional to draft, review, and execute a formal will that complies with the laws in your jurisdiction. Indian Money Code is not a law firm and does not provide legal advice.***
------------------------------------------------------------------------------------------------

                          **LAST WILL AND TESTAMENT**
                                      OF
                               **${data.fullName.toUpperCase()}**


I, ${data.fullName}, residing at ${data.address}, being of sound mind and memory, do hereby declare this to be my Last Will and Testament, revoking all former wills and codicils made by me.

**ARTICLE I: APPOINTMENT OF EXECUTOR**

I appoint as Executor of this Will:
  - Name: ${data.executor.name}
  - Relationship: ${data.executor.relationship}
  - Address: ${data.executor.address}

My Executor shall have all the powers necessary to administer my estate.

**ARTICLE II: BEQUESTS OF PROPERTY**

I direct my Executor to distribute my property as follows:

${assetsByBeneficiary}

**ARTICLE III: RESIDUARY ESTATE**

${unassignedAssetsText}

**ARTICLE IV: SIGNATURE AND WITNESSES**

IN WITNESS WHEREOF, I have subscribed my name below on this ${today}.


__________________________________
(Signature of ${data.fullName})


We, the undersigned, certify that the foregoing instrument was signed by ${data.fullName} in our presence and in the presence of each other, and we now, at their request, in their presence, subscribe our names as witnesses on this ${today}.


**WITNESS 1:**

Signature: _________________________
Name: ${data.witness1.name}
Address: ${data.witness1.address}


**WITNESS 2:**

Signature: _________________________
Name: ${data.witness2.name}
Address: ${data.witness2.address}
`;
};